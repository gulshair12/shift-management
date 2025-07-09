import Cookies from "js-cookie";

interface CookieOptions {
  expires?: number; // days
  path?: string;
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  Cookies.set(name, value, {
    expires: options.expires,
    path: options.path || "/",
  });
}

export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}
