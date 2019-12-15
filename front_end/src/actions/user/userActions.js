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
  const signInResponse = await UserApi.signIn(username, password);

  if (!signInResponse.ok) return signInResponse;

  const jwtToken = signInResponse.json().Authorization;
  Cookies.setJwtToken(jwtToken);

  const getUserResponse = await UserApi.getUser(username);

  if (getUserResponse.ok) {
    Cookies.setUsername(getUserResponse.json().username);
    Cookies.setUserId(getUserResponse.json().userId);

    dispatcher.dispatch({
      actionType: actionTypes.SIGN_IN,
      user: { ...getUserResponse.json(), jwtToken }
    });
  }

  return getUserResponse;
}

export async function createUser(newUser) {
  const createUserResponse = await UserApi.createUser(newUser);

  return createUserResponse.ok
    ? await signIn(newUser.username, newUser.password)
    : createUserResponse;
}
