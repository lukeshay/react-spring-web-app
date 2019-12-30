import { EventEmitter } from "events";
import Dispatcher from "../../appDispatcher";
import { ToDo } from "../../types";
import Types from "./toDoActionTypes";

export interface IAction {
  actionType: string;
  toDo: ToDo;
  toDos: ToDo[];
  id: string;
}

const CHANGE_EVENT = "change";
let toDos: ToDo[] = [];

class ToDoStore extends EventEmitter {
  public addChangeListener(callback: any): void {
    this.on(CHANGE_EVENT, callback);
  }

  public removeChangeListener(callback: any): void {
    this.removeListener(CHANGE_EVENT, callback);
  }

  public emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  public getToDos(): ToDo[] {
    return toDos;
  }
}

const store = new ToDoStore();

Dispatcher.register((action: IAction) => {
  switch (action.actionType) {
    case Types.DELETE_TODO:
      toDos = toDos.filter((toDo: ToDo) => toDo.id !== action.id);
      store.emitChange();
      break;

    case Types.CREATE_TODO:
      toDos.push(action.toDo);
      store.emitChange();
      break;

    case Types.UPDATE_TODO:
      toDos = toDos.map((toDo: ToDo) =>
        toDo.id === action.toDo.id ? action.toDo : toDo
      );
      store.emitChange();
      break;

    case Types.LOAD_TODOS:
      toDos = action.toDos;
      store.emitChange();
      break;

    default:
    // nothing to do here
  }
});

export default store;
