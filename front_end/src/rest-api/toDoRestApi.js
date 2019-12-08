import { handleError } from "./apiUtils";
import { toast } from "react-toastify";
const baseUrl = process.env.BASE_URL + "todos/";

export function getUsersToDos(userId) {
  return fetch(baseUrl + userId)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        toast.error("There was an error getting your todos.");
      }
    })
    .catch(handleError);
}

export function saveToDo(toDo) {
  return fetch(baseUrl + (toDo.id || ""), {
    method: toDo.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {
      "Content-Type": "application/json",
      Authorization: "hh",
      Origin: ""
    },

    body: JSON.stringify(toDo)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        toast.error("There was an error saving your to-do.");
      }
    })
    .catch(handleError);
}

export function deleteToDo(toDoId) {
  return fetch(baseUrl + toDoId, { method: "DELETE" })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        toast.error("There was an error deleting your todo.");
      }
    })
    .catch(handleError);
}
