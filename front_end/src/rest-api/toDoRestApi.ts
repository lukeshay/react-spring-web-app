import { handleError } from "./apiUtils";
import * as Cookies from "../utils/cookiesUtils";
import { ToDo } from "../models";

const baseUrl = process.env.BASE_URL + "todos/";

export async function getUsersToDos(userId: string): Promise<void | Response> {
  return fetch(baseUrl + userId, {
    headers: {
      Authorization: Cookies.getJwtToken()
    }
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}

export async function saveToDo(toDo: ToDo): Promise<void | Response> {
  return fetch(baseUrl + (toDo.id || ""), {
    method: toDo.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken()
    },
    body: JSON.stringify(toDo)
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}

export async function deleteToDo(toDoId: string): Promise<void | Response> {
  return fetch(baseUrl + toDoId, {
    method: "DELETE",
    headers: { Authorization: Cookies.getJwtToken() }
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}
