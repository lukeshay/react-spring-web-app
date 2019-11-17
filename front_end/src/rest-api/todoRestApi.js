import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://159.65.227.26:5000/todo/";

export function getTodos() {
    return fetch(baseUrl + "all")
        .then(handleResponse)
        .catch(handleError);
}

export function getUsersTodos(userId) {
    return fetch(baseUrl + userId)
        .then(handleResponse)
        .catch(handleError);
}

export function saveTodo(todo) {
    return fetch(baseUrl + (todo.id || ""), {
        method: todo.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: { "content-type": "application/json" },
        body: JSON.stringify(todo)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteTodo(todoId) {
    return fetch(baseUrl + todoId, { method: "DELETE" })
        .then(handleResponse)
        .catch(handleError);
}
