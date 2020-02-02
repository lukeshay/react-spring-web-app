import { User } from "../types";
import { handleError } from "./apiUtils";
import * as Cookies from "../utils/cookiesUtils";

const baseUrl = process.env.BASE_URL;
const signInUrl = baseUrl + "login";
const userUrl = baseUrl + "users";

export async function signIn(
  username: string,
  password: string,
  rememberMe: boolean
): Promise<void | Response> {
  const remember = rememberMe ? "?remember=true" : "";
  return fetch(signInUrl + remember, {
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken(),
      Refresh: Cookies.getRefreshToken()
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

export async function getUser(): Promise<void | Response> {
  return fetch(userUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken(),
      Refresh: Cookies.getRefreshToken()
    },
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
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken(),
      Refresh: Cookies.getRefreshToken()
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
  return fetch(userUrl, {
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken(),
      Refresh: Cookies.getRefreshToken()
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
