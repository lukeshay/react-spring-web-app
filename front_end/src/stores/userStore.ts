import { EventEmitter } from "events";
import * as actionTypes from "../actions/user/userActionTypes";
import Dispatcher from "../appDispatcher";
import { User } from "../models";

export interface ActionInterface {
  actionType: string;
  user: User;
}

const CHANGE_EVENT = "change";
let user: User = {} as User;

class UserStore extends EventEmitter {
  public addChangeListener(callback: any): void {
    this.on(CHANGE_EVENT, callback);
  }

  public removeChangeListener(callback: any): void {
    this.removeListener(CHANGE_EVENT, callback);
  }

  public emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  public getUser(): User {
    return user;
  }
}

const store = new UserStore();

Dispatcher.register((action: ActionInterface) => {
  switch (action.actionType) {
    case actionTypes.SIGN_IN:
      user = action.user;
      store.emitChange();
      break;

    case actionTypes.SIGN_OUT:
      user = {} as User;
      store.emitChange();
      break;

    default:
  }
});

export default store;
