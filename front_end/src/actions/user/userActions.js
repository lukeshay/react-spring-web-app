import dispatcher from "../../appDispatcher";
import actionTypes from "./userActionTypes";
import * as UserApi from "../../rest-api/userRestApi";
import { setJwtToken } from "../../utils/cookiesUtils";

export async function signOut() {
  dispatcher.dispatch({
    actionType: actionTypes.SIGN_OUT
  });
}

export async function signIn(username, password) {
  const token = await UserApi.signIn(username, password);
  const jwtToken = token.Authorization;

  setJwtToken(token.Authorization);

  const _user = await UserApi.getUser(username);

  dispatcher.dispatch({
    actionType: actionTypes.SIGN_IN,
    user: { ..._user, jwtToken }
  });
}

export async function createUser(newUser) {
  await UserApi.createUser(newUser);
  await UserApi.signIn(newUser.username, newUser.password);
}
