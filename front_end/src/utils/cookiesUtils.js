import Cookies from "universal-cookie";

const cookies = new Cookies();

export function setCookie(key, value, options) {
  cookies.set(key, value, options);
}

export function getCookie(key) {
  return cookies.get(key);
}

export function setJwtToken(token) {
  let d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);

  cookies.set("jwtToken", token, { path: "/", expires: d });
}

export function getJwtToken() {
  return cookies.get("jwtToken");
}
