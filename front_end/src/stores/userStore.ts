import { EventEmitter } from "events";
import Types from "../actions/user/userActionTypes";
import Dispatcher from "../appDispatcher";
import { User } from "../types";

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
    case Types.SIGN_IN:
      user = action.user;
      store.emitChange();
      break;

    case Types.SIGN_OUT:
      user = {} as User;
      store.emitChange();
      break;

    default:
  }
});

export default store;
