import dispatcher from "../../appDispatcher";
import * as toDoApi from "../../rest-api/toDoRestApi";
import actionTypes from "./actionTypes";

export async function loadUsersToDos(user) {
  const toDos = await toDoApi.getUsersToDos(user.userId, user.jwtToken);

  dispatcher.dispatch({
    actionType: actionTypes.LOAD_TODOS,
    toDos: toDos
  });
}

export async function saveToDo(toDo, user) {
  const savedToDo = await toDoApi.saveToDo(toDo, user.jwtToken);

  dispatcher.dispatch({
    actionType: toDo.id ? actionTypes.UPDATE_TODO : actionTypes.CREATE_TODO,
    toDo: savedToDo
  });
}

export async function deleteToDo(id, user) {
  await toDoApi.deleteToDo(id, user.jwtToken);

  dispatcher.dispatch({
    actionType: actionTypes.DELETE_TODO,
    id: id
  });
}
