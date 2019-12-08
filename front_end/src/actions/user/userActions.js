import dispatcher from "../../appDispatcher";
import actionTypes from "./userActionTypes";
import * as userApi from "../../rest-api/userRestApi";
import { setJwtToken } from "../../utils/cookiesUtils";

export async function signOut() {
  dispatcher.dispatch({
    actionType: actionTypes.SIGN_OUT
  });
}

export async function signIn(username, password) {
  const token = await userApi.signIn(username, password);
  const jwtToken = token.Authorization;

  setJwtToken(token.Authorization);

  const _user = await userApi.getUser(username);

  dispatcher.dispatch({
    actionType: actionTypes.SIGN_IN,
    user: { ..._user, jwtToken }
  });
}
