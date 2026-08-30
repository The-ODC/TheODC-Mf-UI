import { useState, useEffect, useCallback } from "react";

function useCookies() {
  // State to store cookies managed by this hook
  const [cookies, setCookies] = useState({});

  // Read a cookie value by name from document.cookie
  const readCookie = useCallback((name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  }, []);

  // On mount, parse all cookies into state
  useEffect(() => {
    const parsed = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, ...val] = cookie.split("=");
      acc[name] = decodeURIComponent(val.join("="));
      return acc;
    }, {});
    setCookies(parsed);
  }, []);

  // Get cookie from state or fallback to document.cookie
  const getCookie = useCallback(
    (name) => cookies[name] ?? readCookie(name),
    [cookies, readCookie]
  );

  // Set or update a cookie with options
  const setCookie = useCallback((name, value, options = {}) => {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    // Set max-age in seconds (supports days, hours, minutes, or seconds)
    if (options.maxAgeDays !== undefined) {
      cookieStr += `; max-age=${options.maxAgeDays * 24 * 3600}`;
    } else if (options.maxAgeHours !== undefined) {
      cookieStr += `; max-age=${options.maxAgeHours * 3600}`;
    } else if (options.maxAgeMinutes !== undefined) {
      cookieStr += `; max-age=${options.maxAgeMinutes * 60}`;
    } else if (options.maxAge !== undefined) {
      cookieStr += `; max-age=${options.maxAge}`;
    }

    // Add other cookie attributes if given
    if (options.path) cookieStr += `; path=${options.path}`;
    if (options.domain) cookieStr += `; domain=${options.domain}`;
    if (options.secure) cookieStr += `; secure`;
    if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;

    // Set cookie
    document.cookie = cookieStr;

    // Update local state
    setCookies((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Remove cookie by setting max-age to 0, expires to past date, and deleting from state
  const removeCookie = useCallback((name, options = {}) => {
    const path = options.path || "/";
    let cookieStr = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=${path}`;
    if (options.domain) cookieStr += `; domain=${options.domain}`;
    if (options.secure) cookieStr += `; secure`;
    if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;
    document.cookie = cookieStr;

    setCookies((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }, []);

  return { getCookie, setCookie, removeCookie, cookies };
}

export default useCookies;
