import { EventEmitter } from "events";
import Dispatcher from "../../appDispatcher";
import { Gym } from "../../types/gym";
import Types from "./gymsActionTypes";

export interface IAction {
  actionType: string;
  gyms: Gym[];
}

const CHANGE_EVENT = "change";
let gyms: Gym[] = [];

export class GymsStore extends EventEmitter {
  public addChangeListener(callback: any): void {
    this.on(CHANGE_EVENT, callback);
  }

  public removeChangeListener(callback: any): void {
    this.removeListener(CHANGE_EVENT, callback);
  }

  public emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  public getGyms(): Gym[] {
    return gyms;
  }
}

const store = new GymsStore();

Dispatcher.register((action: IAction) => {
  switch (action.actionType) {
    case Types.LOAD_GYMS:
      gyms = action.gyms;
      store.emitChange();
      break;

    default:
  }
});

export default store;
