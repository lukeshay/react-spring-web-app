import dispatcher from "../../appDispatcher";
import actionTypes from "./userActionTypes";
import * as userApi from "../../rest-api/userRestApi";

export async function signOut() {
  dispatcher.dispatch({
    actionType: actionTypes.SIGN_OUT
  });
}

export async function signIn(username, password) {
  const token = await userApi.signIn(username, password);

  console.log(token);

  const _user = await userApi.getUser(username, token);

  console.log(_user);

  dispatcher.dispatch({
    actionType: actionTypes.SIGN_IN,
    user: { ..._user, token }
  });
}
