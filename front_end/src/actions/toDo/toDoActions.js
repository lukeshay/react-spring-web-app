import dispatcher from "../../appDispatcher";
import * as toDoApi from "../../rest-api/toDoRestApi";
import actionTypes from "./actionTypes";

export async function loadUsersToDos(userId) {
  const response = await toDoApi.getUsersToDos(userId);

  if (response.ok) {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_TODOS,
      toDos: response.json()
    });
  }

  return response;
}

export async function saveToDo(toDo) {
  const response = await toDoApi.saveToDo(toDo);

  if (response.ok) {
    dispatcher.dispatch({
      actionType: toDo.id ? actionTypes.UPDATE_TODO : actionTypes.CREATE_TODO,
      toDo: response.json()
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
