import { handleError } from "./apiUtils";
import * as Cookies from "../utils/cookiesUtils";
import { User } from "../models";

const baseUrl = process.env.BASE_URL;
const signInUrl = baseUrl + "login";
const userUrl = baseUrl + "users";

export async function signIn(
  username: string,
  password: string
): Promise<void | Response> {
  return fetch(signInUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
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
    method: "GET",
    headers: { Authorization: token }
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}

export async function createUser(user: User): Promise<void | Response> {
  return fetch(baseUrl + "public/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
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
    method: "PUT",
    body: JSON.stringify(user),
    headers: { Authorization: token }
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}
