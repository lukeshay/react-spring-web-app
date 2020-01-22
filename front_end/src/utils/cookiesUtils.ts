import * as Time from "./timeUtils";

const JWT_TOKEN = "jwtToken";
const THEME = "theme";

export function setCookie(key: string, value: string, options: any): void {
  localStorage.setItem(key, value);
}

export function getCookie(key: string): string {
  return localStorage.getItem(key) || "";
}

export function setJwtToken(token: string): void {
  setCookie(JWT_TOKEN, token, { path: "/", expires: Time.getOneDay() });
}

export function getJwtToken(): string {
  return getCookie(JWT_TOKEN);
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
