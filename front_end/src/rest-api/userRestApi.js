import { handleError } from "./apiUtils";
import * as Cookies from "../utils/cookiesUtils";

const baseUrl = process.env.BASE_URL;
const signInUrl = baseUrl + "login";
const userUrl = baseUrl + "users";

export async function signIn(username, password) {
  return fetch(signInUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      return response;
    })
    .catch(handleError);
}

export async function getUser(username) {
  const token = Cookies.getJwtToken();

  return fetch(userUrl + "?username=" + username, {
    method: "GET",
    headers: { Authorization: token }
  })
    .then(response => {
      return response;
    })
    .catch(handleError);
}

export async function createUser(user) {
  return fetch(baseUrl + "public/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response;
    })
    .catch(handleError);
}

export async function updateUser(user) {
  const token = Cookies.getJwtToken();

  return fetch(userUrl + "?userId=" + user.userId, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: { Authorization: token }
  })
    .then(response => {
      return response;
    })
    .catch(handleError);
}
