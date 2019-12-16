import dispatcher from "../../appDispatcher";
import * as toDoApi from "../../rest-api/toDoRestApi";
import actionTypes from "./actionTypes";

export async function loadUsersToDos(userId) {
  const response = await toDoApi.getUsersToDos(userId);

  if (response.ok) {
    const body = await response.json();

    dispatcher.dispatch({
      actionType: actionTypes.LOAD_TODOS,
      toDos: body
    });
  }

  return response;
}

export async function saveToDo(toDo) {
  const response = await toDoApi.saveToDo(toDo);

  if (response.ok) {
    const body = await response.json();

    dispatcher.dispatch({
      actionType: toDo.id ? actionTypes.UPDATE_TODO : actionTypes.CREATE_TODO,
      toDo: body
    });
  }

  return response;
}

export async function deleteToDo(id) {
  const response = await toDoApi.deleteToDo(id);

  if (response.ok) {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_TODO,
      id: id
    });
  }

  return response;
}
