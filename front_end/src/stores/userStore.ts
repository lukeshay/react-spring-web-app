import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import * as actionTypes from "../actions/user/userActionTypes";
import { User } from "../models";

export interface ActionInterface {
  actionType: string;
  user: User;
}

const CHANGE_EVENT = "change";
let _user: User = {} as User;

class UserStore extends EventEmitter {
  addChangeListener(callback: any): void {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback: any): void {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  getUser(): User {
    return _user;
  }
}

const store = new UserStore();

Dispatcher.register((action: ActionInterface) => {
  switch (action.actionType) {
    case actionTypes.SIGN_IN:
      _user = action.user;
      store.emitChange();
      break;

    case actionTypes.SIGN_OUT:
      _user = {} as User;
      store.emitChange();
      break;

    default:
  }
});

export default store;
