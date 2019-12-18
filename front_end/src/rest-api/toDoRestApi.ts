import { handleError } from "./apiUtils";
import * as Cookies from "../utils/cookiesUtils";
import { ToDo } from "../models";

const baseUrl = process.env.BASE_URL + "todos/";

export function getUsersToDos(userId: string) {
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

export function saveToDo(toDo: ToDo) {
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

export function deleteToDo(toDoId: string) {
  return fetch(baseUrl + toDoId, {
    method: "DELETE",
    headers: { Authorization: Cookies.getJwtToken() }
  })
    .then(response => {
      return response;
    })
    .catch(handleError);
}
