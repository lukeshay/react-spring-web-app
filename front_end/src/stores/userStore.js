import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/user/userActionTypes";

const CHANGE_EVENT = "change";
let _user = {};

class UserStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getUser() {
    return _user;
  }
}

const store = new UserStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.SIGN_IN:
      _user = action.user;
      store.emitChange();
      break;

    case actionTypes.SIGN_OUT:
      _user = {};
      store.emitChange();
      break;

    default:
    // nothing to do here
  }
});

export default store;
