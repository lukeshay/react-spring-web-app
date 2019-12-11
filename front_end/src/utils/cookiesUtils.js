import Cookies from "universal-cookie";
import * as Time from "./timeUtils";

const cookies = new Cookies();
const USER_ID = "userId";
const USERNAME = "username";
const JWT_TOKEN = "jwtToken";

export function setCookie(key, value, options) {
  cookies.set(key, value, options);
}

export function getCookie(key) {
  return cookies.get(key);
}

export function setJwtToken(token) {
  const d = Time.getOneDay();
  cookies.set(JWT_TOKEN, token, { path: "/", expires: d });
}

export function getJwtToken() {
  return cookies.get(JWT_TOKEN);
}

export function setUsername(username) {
  const d = Time.getOneDay();
  cookies.set(USERNAME, username, { path: "/", expires: d });
}

export function getUsername() {
  return cookies.get(USERNAME);
}

export function setUserId(userId) {
  const d = Time.getOneDay();
  cookies.set(USER_ID, userId, { path: "/", expires: d });
}

export function getUserId() {
  return cookies.get(USER_ID);
}
