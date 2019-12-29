import { User } from "../types";
import * as Cookies from "../utils/cookiesUtils";
import { handleError } from "./apiUtils";

const baseUrl = process.env.BASE_URL;
const signInUrl = baseUrl + "login";
const userUrl = baseUrl + "users";

export async function signIn(
  username: string,
  password: string
): Promise<void | Response> {
  return fetch(signInUrl, {
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}

export async function getUser(username: string): Promise<void | Response> {
  const token = Cookies.getJwtToken();

  return fetch(userUrl + "?username=" + username, {
    headers: { Authorization: token },
    method: "GET"
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}

export async function createUser(user: User): Promise<void | Response> {
  return fetch(baseUrl + "users/new", {
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}

export async function updateUser(user: User): Promise<void | Response> {
  const token = Cookies.getJwtToken();

  return fetch(userUrl + "?userId=" + user.userId, {
    body: JSON.stringify(user),
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    method: "PUT"
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}
