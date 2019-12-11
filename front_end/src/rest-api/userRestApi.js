import { handleError } from "./apiUtils";
import { toast } from "react-toastify";
import { getJwtToken } from "../utils/cookiesUtils";

const baseUrl = process.env.BASE_URL;
const signInUrl = baseUrl + "login";
const userUrl = baseUrl + "users";

export async function signIn(username, password) {
  return fetch(signInUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "",
      credentials: "same-origin"
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        toast.error("There was an error signing in.");
      }
    })
    .catch(handleError);
}

export async function getUser(username) {
  const token = getJwtToken();

  return fetch(userUrl + "?username=" + username, {
    method: "GET",
    headers: { Authorization: token }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        toast.error("There was an error signing in.");
      }
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
      if (response.ok) {
        return response.json();
      } else {
        toast.error("There was an error creating your user.");
      }
    })
    .catch(handleError);
}
