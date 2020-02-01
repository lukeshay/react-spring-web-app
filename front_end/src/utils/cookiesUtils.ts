import Cookies from "universal-cookie";
import * as Time from "./timeUtils";

const cookies = new Cookies();
const JWT_TOKEN = "JWT_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const THEME = "THEME";

interface ICookieOptions {
  path?: string;
  expires?: Date;
}

export function setCookie(
  key: string,
  value: string,
  options: ICookieOptions
): void {
  cookies.set(key, value, options);
}

export function getCookie(key: string): string {
  return cookies.get(key);
}

export function setJwtToken(token: string): void {
  const d = Time.getOneDay();
  setCookie(JWT_TOKEN, token, { path: "/", expires: d });
}

export function getJwtToken(): string {
  return getCookie(JWT_TOKEN);
}

export function setRefreshToken(token: string): void {
  const d = Time.getOneDay();
  setCookie(REFRESH_TOKEN, token, { path: "/", expires: d });
}

export function getRefreshToken(): string {
  return getCookie(REFRESH_TOKEN);
}

export function setTheme(theme: "DARK_THEME" | "LIGHT_THEME"): void {
  setCookie(THEME, theme, {});
}

export function getTheme(): "DARK_THEME" | "LIGHT_THEME" | undefined {
  const theme = getCookie(THEME);

  if (theme !== "DARK_THEME" && theme !== "LIGHT_THEME") {
    return undefined;
  } else {
    return theme;
  }
}
