import { handleError } from "./apiUtils";
import * as Cookies from "../utils/cookiesUtils";

const baseUrl = process.env.BASE_URL + "todos/";

export function getUsersToDos(userId) {
  return fetch(baseUrl + userId, {
    headers: {
      Authorization: Cookies.getJwtToken()
    }
  })
    .then(response => {
      return response;
    })
    .catch(handleError);
}

export function saveToDo(toDo) {
  return fetch(baseUrl + (toDo.id || ""), {
    method: toDo.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken()
    },
    body: JSON.stringify(toDo)
  })
    .then(response => {
      return response;
    })
    .catch(handleError);
}

export function deleteToDo(toDoId) {
  return fetch(baseUrl + toDoId, {
    method: "DELETE",
    headers: { Authorization: Cookies.getJwtToken() }
  })
    .then(response => {
      return response;
    })
    .catch(handleError);
}
