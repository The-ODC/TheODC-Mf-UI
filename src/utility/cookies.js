function parseAllCookies() {
  if (typeof document === "undefined" || !document.cookie) return {};

  return document.cookie.split("; ").reduce((acc, cookie) => {
    const [name, ...val] = cookie.split("=");
    acc[name] = decodeURIComponent(val.join("="));
    return acc;
  }, {});
}

function getCookie(name) {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name, value, options = {}) {
  if (typeof document === "undefined") return;

  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.maxAgeDays !== undefined) {
    cookieStr += `; max-age=${options.maxAgeDays * 24 * 3600}`;
  } else if (options.maxAgeHours !== undefined) {
    cookieStr += `; max-age=${options.maxAgeHours * 3600}`;
  } else if (options.maxAgeMinutes !== undefined) {
    cookieStr += `; max-age=${options.maxAgeMinutes * 60}`;
  } else if (options.maxAge !== undefined) {
    cookieStr += `; max-age=${options.maxAge}`;
  }

  if (options.path) cookieStr += `; path=${options.path}`;
  if (options.domain) cookieStr += `; domain=${options.domain}`;
  if (options.secure) cookieStr += `; secure`;
  if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;

  document.cookie = cookieStr;
}

function removeCookie(name, options = {}) {
  const path = options.path || "/";
  let cookieStr = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=${path}`;
  if (options.domain) cookieStr += `; domain=${options.domain}`;
  if (options.secure) cookieStr += `; secure`;
  if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;
  document.cookie = cookieStr;
}

export const cookies = { getCookie, setCookie, removeCookie, parseAllCookies };
