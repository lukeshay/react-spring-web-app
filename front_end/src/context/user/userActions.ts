import * as UserApi from "../../api/userApi";
import { AuthBody, User } from "../../types";
import * as Cookies from "../../utils/cookiesUtils";
import Types from "./userActionTypes";
import { Dispatch } from "react";
import { IUserContextAction } from "./userStore";

export async function signOut(
  dispatch: Dispatch<IUserContextAction>
): Promise<void> {
  Cookies.setJwtToken("");

  dispatch({
    actionType: Types.SIGN_OUT,
    user: null
  });
}

export async function signIn(
  dispatch: Dispatch<IUserContextAction>,
  username: string,
  password: string,
  rememberMe: boolean
): Promise<void | Response> {
  const signInResponse = await UserApi.signIn(username, password, rememberMe);

  if (signInResponse instanceof Response && signInResponse.ok) {
    const signInBody: AuthBody = await signInResponse.json();
    const { session } = signInBody;
    const jwtToken = session.tokens.jwtToken;
    const refreshToken = session.tokens.refreshToken;
    const user = signInBody.user;

    user.session = session;

    Cookies.setJwtToken(jwtToken);
    Cookies.setRefreshToken(refreshToken);

    dispatch({
      actionType: Types.SIGN_IN,
      user
    });
  }

  return signInResponse;
}

export async function createUser(
  dispatch: Dispatch<IUserContextAction>,
  newUser: User
): Promise<void | Response> {
  const createUserResponse = await UserApi.createUser(newUser);

  return !(createUserResponse instanceof Response) || createUserResponse.ok
    ? await signIn(dispatch, newUser.username, newUser.password, false)
    : createUserResponse;
}

export async function updateUser(
  dispatch: Dispatch<IUserContextAction>,
  updatedUser: User
): Promise<void | Response> {
  const updateUserResponse = await UserApi.updateUser(updatedUser);

  if (updateUserResponse instanceof Response && updateUserResponse.ok) {
    const updatedUserBody = await updateUserResponse.json();

    dispatch({
      actionType: Types.UPDATE_USER,
      user: updatedUserBody
    });
  }

  return updateUserResponse;
}

export const loadUserFromCookies = async (
  dispatch: Dispatch<IUserContextAction>
): Promise<void | Response> => {
  const getUserResponse = await UserApi.getUser();

  if (getUserResponse instanceof Response && getUserResponse.ok) {
    const getUserBody = await getUserResponse.json();

    dispatch({
      actionType: Types.SIGN_IN,
      user: getUserBody
    });
  }

  return getUserResponse;
};
