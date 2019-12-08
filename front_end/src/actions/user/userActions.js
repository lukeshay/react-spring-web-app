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
  const jwtToken = token.Authorization;
  const _user = await userApi.getUser(username, jwtToken);

  dispatcher.dispatch({
    actionType: actionTypes.SIGN_IN,
    user: { ..._user, jwtToken }
  });
}
