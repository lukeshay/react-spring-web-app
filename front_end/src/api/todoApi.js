import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3001/toDos/";

export function getToDos() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}

export function saveToDo(toDo) {
    return fetch(baseUrl + (toDo.id || ""), {
        method: toDo.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: { "content-type": "application/json" },
        body: JSON.stringify(toDo)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteToDo(toDoId) {
    return fetch(baseUrl + toDoId, { method: "DELETE" })
        .then(handleResponse)
        .catch(handleError);
}
