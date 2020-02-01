import { User } from "../types";
import { handleError, jsonHeaders } from "./apiUtils";

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
    headers: jsonHeaders,
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
    headers: jsonHeaders,
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
    headers: jsonHeaders,
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
    headers: jsonHeaders,
    method: "PUT"
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}
