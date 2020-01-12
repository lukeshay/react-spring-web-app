import Cookies from "universal-cookie";
import { User } from "../types";
import * as Time from "./timeUtils";

const cookies = new Cookies();
const USER = "user";
const USER_ID = "userId";
const USERNAME = "username";
const JWT_TOKEN = "jwtToken";

export function setCookie(key: string, value: string, options: any): void {
  cookies.set(key, value, options);
}

export function getCookie(key: string): string {
  return cookies.get(key);
}

export function setJwtToken(token: string) {
  const d = Time.getOneDay();
  cookies.set(JWT_TOKEN, token, { path: "/", expires: d });
}

export function getJwtToken(): string {
  return cookies.get(JWT_TOKEN);
}

export function setUsername(username: string) {
  const d = Time.getOneDay();
  cookies.set(USERNAME, username, { path: "/", expires: d });
}

export function getUsername(): string {
  return cookies.get(USERNAME);
}

export function setUserId(userId: string) {
  const d = Time.getOneDay();
  cookies.set(USER_ID, userId, { path: "/", expires: d });
}

export function getUserId(): string {
  return cookies.get(USER_ID);
}

export function setUser(user: User) {
  const d = Time.getOneDay();
  cookies.set(USER, user, { path: "/", expires: d });
}

export function getUser(): User {
  return cookies.get(USER);
}
