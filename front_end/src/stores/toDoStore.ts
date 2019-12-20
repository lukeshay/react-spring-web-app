import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import * as actionTypes from "../actions/toDo/toDoActionTypes";
import { ToDo } from "../models";

export interface ActionInterface {
  actionType: string;
  toDo: ToDo;
  toDos: ToDo[];
  id: string;
}

const CHANGE_EVENT = "change";
let _toDos: ToDo[] = [];

class ToDoStore extends EventEmitter {
  addChangeListener(callback: any): void {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback: any): void {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  getToDos(): ToDo[] {
    return _toDos;
  }
}

const store = new ToDoStore();

Dispatcher.register((action: ActionInterface) => {
  switch (action.actionType) {
    case actionTypes.DELETE_TODO:
      _toDos = _toDos.filter((toDo: ToDo) => toDo.id !== action.id);
      store.emitChange();
      break;

    case actionTypes.CREATE_TODO:
      _toDos.push(action.toDo);
      store.emitChange();
      break;

    case actionTypes.UPDATE_TODO:
      _toDos = _toDos.map((toDo: ToDo) =>
        toDo.id === action.toDo.id ? action.toDo : toDo
      );
      store.emitChange();
      break;

    case actionTypes.LOAD_TODOS:
      _toDos = action.toDos;
      store.emitChange();
      break;

    default:
    // nothing to do here
  }
});

export default store;
