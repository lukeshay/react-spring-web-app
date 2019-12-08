import { handleError } from "./apiUtils";
import { toast } from "react-toastify";

const baseUrl = process.env.BASE_URL + "todos/";

export function getUsersToDos(userId, jwtToken) {
  return fetch(baseUrl + userId, {
    headers: {
      Authorization: jwtToken
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        toast.error("There was an error getting your todos.");
      }
    })
    .catch(handleError);
}

export function saveToDo(toDo, jwtToken) {
  return fetch(baseUrl + (toDo.id || ""), {
    method: toDo.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {
      "Content-Type": "application/json",
      Authorization: jwtToken,
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

export function deleteToDo(toDoId, jwtToken) {
  return fetch(baseUrl + toDoId, {
    method: "DELETE",
    headers: { Authorization: jwtToken }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        toast.error("There was an error deleting your todo.");
      }
    })
    .catch(handleError);
}
