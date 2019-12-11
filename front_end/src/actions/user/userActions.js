import dispatcher from "../../appDispatcher";
import actionTypes from "./userActionTypes";
import * as UserApi from "../../rest-api/userRestApi";
import * as Cookies from "../../utils/cookiesUtils";

export async function signOut() {
  dispatcher.dispatch({
    actionType: actionTypes.SIGN_OUT
  });
}

export async function signIn(username, password) {
  const token = await UserApi.signIn(username, password);
  const jwtToken = token.Authorization;
  const _user = await UserApi.getUser(username);

  Cookies.setJwtToken(token.Authorization);
  Cookies.setUsername(_user.username);
  Cookies.setUserId(_user.userId);

  dispatcher.dispatch({
    actionType: actionTypes.SIGN_IN,
    user: { ..._user, jwtToken }
  });
}

export async function createUser(newUser) {
  await UserApi.createUser(newUser);
  await signIn(newUser.username, newUser.password);
}
