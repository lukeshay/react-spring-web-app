import { EventEmitter } from "events";
import Types from "../actions/gyms/gymsActionTypes";
import Dispatcher from "../appDispatcher";
import { Gym } from "../types";

export interface ActionInterface {
  actionType: string;
  gyms: Gym[];
  id: string;
}

const CHANGE_EVENT = "change";
let gyms: Gym[] = [];

class GymsStore extends EventEmitter {
  public addChangeListener(callback: any): void {
    this.on(CHANGE_EVENT, callback);
  }

  public removeChangeListener(callback: any): void {
    this.removeListener(CHANGE_EVENT, callback);
  }

  public emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  public getToDos(): Gym[] {
    return gyms;
  }
}

const store = new GymsStore();

Dispatcher.register((action: ActionInterface) => {
  switch (action.actionType) {
    case Types.LOAD_GYMS:
      gyms = action.gyms;
      store.emitChange();

    default:
  }
});

export default store;
