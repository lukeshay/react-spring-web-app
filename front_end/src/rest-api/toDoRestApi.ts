import { ToDo } from "../models";
import * as Cookies from "../utils/cookiesUtils";
import { handleError } from "./apiUtils";

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
    body: JSON.stringify(toDo),
    headers: {
      Authorization: Cookies.getJwtToken(),
      "Content-Type": "application/json"
    },
    method: toDo.id ? "PUT" : "POST"
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
    headers: { Authorization: Cookies.getJwtToken() },
    method: "DELETE"
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
}
