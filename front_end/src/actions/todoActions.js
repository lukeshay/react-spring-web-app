import dispatcher from "../appDispatcher";
import * as todoApi from "../rest-api/todoRestApi";
import actionTypes from "./actionTypes";

export async function loadTodos() {
    const todos = await todoApi.getTodos();

    dispatcher.dispatch({
        actionType: actionTypes.LOAD_TODOS,
        todos: todos
    });
}

export async function saveTodo(todo) {
    const savedTodo = await todoApi.saveTodo(todo);

    dispatcher.dispatch({
        actionType: todo.id ? actionTypes.UPDATE_TODO : actionTypes.CREATE_TODO,
        todo: savedTodo
    });
}

export async function deleteTodo(id) {
    await todoApi.deleteTodo(id);

    dispatcher.dispatch({
        actionType: actionTypes.DELETE_TODO,
        id: id
    });
}
