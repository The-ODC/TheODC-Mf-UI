import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cookies } from "../utility";

const DEFAULT_COOKIE_OPTIONS = {
  path: "/",
  sameSite: "Lax",
};

function getBrowserStorage(type) {
  if (typeof window === "undefined") return null;

  try {
    return window[type] || null;
  } catch {
    return null;
  }
}

function createWebStorageAdapter(type) {
  return {
    getItem(key) {
      return getBrowserStorage(type)?.getItem(key) ?? null;
    },
    setItem(key, value) {
      getBrowserStorage(type)?.setItem(key, value);
    },
    removeItem(key) {
      getBrowserStorage(type)?.removeItem(key);
    },
    source: type,
  };
}

function createCookieStorageAdapter(cookieOptions) {
  return {
    getItem(key) {
      return cookies.getCookie(key);
    },
    setItem(key, value) {
      cookies.setCookie(key, value, cookieOptions);
    },
    removeItem(key) {
      cookies.removeCookie(key, cookieOptions);
    },
    source: "cookie",
  };
}

function createStorageAdapter(storage, cookieOptions) {
  if (
    storage &&
    typeof storage.getItem === "function" &&
    typeof storage.setItem === "function"
  ) {
    return {
      removeItem() {},
      source: "custom",
      ...storage,
    };
  }

  const storageType = String(storage || "local").toLowerCase();

  if (storageType === "session" || storageType === "sessionstorage") {
    return createWebStorageAdapter("sessionStorage");
  }

  if (storageType === "cookie" || storageType === "cookies") {
    return createCookieStorageAdapter(cookieOptions);
  }

  return createWebStorageAdapter("localStorage");
}

function parseStoredValue(storedValue, fallbackValue, deserialize) {
  if (storedValue === null || storedValue === undefined) return fallbackValue;

  try {
    return deserialize ? deserialize(storedValue) : storedValue;
  } catch {
    return fallbackValue;
  }
}

function stringifyValue(value, serialize) {
  return serialize ? serialize(value) : String(value ?? "");
}

function readStoredValue(adapter, key, fallbackValue, deserialize) {
  try {
    return parseStoredValue(adapter.getItem(key), fallbackValue, deserialize);
  } catch {
    return fallbackValue;
  }
}

function writeStoredValue(adapter, key, value, serialize) {
  try {
    adapter.setItem(key, stringifyValue(value, serialize));
  } catch {
    // Storage can be unavailable in private windows or restricted browsers.
  }
}

export function useStorageState(key, fallbackValue, options = {}) {
  const {
    storage = "local",
    cookieOptions = DEFAULT_COOKIE_OPTIONS,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    sync = true,
  } = options;

  const adapter = useMemo(
    () => createStorageAdapter(storage, cookieOptions),
    [cookieOptions, storage]
  );
  const fallbackRef = useRef(fallbackValue);
  fallbackRef.current = fallbackValue;

  const [value, setValueState] = useState(() =>
    readStoredValue(adapter, key, fallbackRef.current, deserialize)
  );

  useEffect(() => {
    setValueState(readStoredValue(adapter, key, fallbackRef.current, deserialize));
  }, [adapter, deserialize, key]);

  useEffect(() => {
    if (!sync || typeof window === "undefined") return undefined;
    if (!["localStorage", "sessionStorage"].includes(adapter.source)) return undefined;

    const handleStorageChange = (event) => {
      if (event.key !== key) return;
      if (event.storageArea !== getBrowserStorage(adapter.source)) return;

      setValueState(parseStoredValue(event.newValue, fallbackRef.current, deserialize));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [adapter, deserialize, key, sync]);

  const setValue = useCallback(
    (nextValue) => {
      setValueState((currentValue) => {
        const resolvedValue =
          typeof nextValue === "function" ? nextValue(currentValue) : nextValue;

        writeStoredValue(adapter, key, resolvedValue, serialize);
        return resolvedValue;
      });
    },
    [adapter, key, serialize]
  );

  const resetValue = useCallback(() => {
    setValue(fallbackRef.current);
  }, [setValue]);

  const removeValue = useCallback(() => {
    try {
      adapter.removeItem(key);
    } catch {
      // Same storage restrictions as writes; state still returns to fallback.
    }

    setValueState(fallbackRef.current);
  }, [adapter, key]);

  return [value, setValue, resetValue, removeValue];
}
