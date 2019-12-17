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

  const signInBody = await signInResponse.json();
  const jwtToken = signInBody.Authorization;

  Cookies.setJwtToken(jwtToken);

  const getUserResponse = await UserApi.getUser(username);

  if (getUserResponse.ok) {
    const getUserBody = await getUserResponse.json();

    Cookies.setUsername(getUserBody.username);
    Cookies.setUserId(getUserBody.userId);

    dispatcher.dispatch({
      actionType: actionTypes.SIGN_IN,
      user: getUserBody
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

export async function updateUser(updatedUser) {
  const updateUserResponse = await UserApi.updateUser(updatedUser);

  if (updateUserResponse.ok) {
    const updatedUserBody = await updateUserResponse.json();

    dispatcher.dispatch({
      actionType: actionTypes.UPDATE_USER,
      user: updatedUserBody
    });
  }
}
