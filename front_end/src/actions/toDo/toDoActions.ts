import dispatcher from "../../appDispatcher";
import * as toDoApi from "../../rest-api/toDoRestApi";
import * as Types from "./toDoActionTypes";
import { ToDo } from "../../models";

export async function loadUsersToDos(userId: string): Promise<void | Response> {
  const response = await toDoApi.getUsersToDos(userId);

  if (response instanceof Response && response.ok) {
    const body = await response.json();

    dispatcher.dispatch({
      actionType: Types.LOAD_TODOS,
      toDos: body
    });
  }

  return response;
}

export async function saveToDo(toDo: ToDo): Promise<void | Response> {
  const response = await toDoApi.saveToDo(toDo);

  if (response instanceof Response && response.ok) {
    const body = await response.json();

    dispatcher.dispatch({
      actionType: toDo.id ? Types.UPDATE_TODO : Types.CREATE_TODO,
      toDo: body
    });
  }

  return response;
}

export async function deleteToDo(id: string): Promise<void | Response> {
  const response = await toDoApi.deleteToDo(id);

  if (response instanceof Response && response.ok) {
    dispatcher.dispatch({
      actionType: Types.DELETE_TODO,
      id
    });
  }

  return response;
}
