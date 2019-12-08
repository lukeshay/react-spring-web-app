import dispatcher from "../../appDispatcher";
import * as toDoApi from "../../rest-api/toDoRestApi";
import actionTypes from "./actionTypes";

export async function loadUsersToDos(uid) {
  const toDos = await toDoApi.getUsersToDos(uid);

  dispatcher.dispatch({
    actionType: actionTypes.LOAD_TODOS,
    toDos: toDos
  });
}

export async function saveToDo(toDo) {
  const savedToDo = await toDoApi.saveToDo(toDo);

  dispatcher.dispatch({
    actionType: toDo.id ? actionTypes.UPDATE_TODO : actionTypes.CREATE_TODO,
    toDo: savedToDo
  });
}

export async function deleteToDo(id) {
  await toDoApi.deleteToDo(id);

  dispatcher.dispatch({
    actionType: actionTypes.DELETE_TODO,
    id: id
  });
}
