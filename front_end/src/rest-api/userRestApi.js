import { handleError } from "./apiUtils";
import { toast } from "react-toastify";

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

export async function getUser(username, token) {
  return fetch(userUrl + "?username=" + username, {
    method: "GET",
    headers: { Authorization: token, credentials: "same-origin" }
  });
}
