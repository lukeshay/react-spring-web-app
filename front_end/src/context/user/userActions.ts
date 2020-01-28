import * as UserApi from "../../api/userApi";
import { AuthBody, User } from "../../types";
import * as Cookies from "../../utils/cookiesUtils";
import Types from "./userActionTypes";

export async function signOut(dispatch: any): Promise<void> {
  Cookies.setJwtToken("");

  dispatch({
    actionType: Types.SIGN_OUT
  });
}

export async function signIn(
  dispatch: any,
  username: string,
  password: string,
  rememberMe: boolean
): Promise<void | Response> {
  const signInResponse = await UserApi.signIn(username, password, rememberMe);

  if (signInResponse instanceof Response && signInResponse.ok) {
    const signInBody: AuthBody = await signInResponse.json();
    const { session } = signInBody;
    const jwtToken = session.tokens.jwtToken;
    const user = signInBody.user;

    user.session = session;

    Cookies.setJwtToken(jwtToken);

    dispatch({
      actionType: Types.SIGN_IN,
      user
    });
  }

  return signInResponse;
}

export async function createUser(
  dispatch: any,
  newUser: User
): Promise<void | Response> {
  const createUserResponse = await UserApi.createUser(newUser);

  return !(createUserResponse instanceof Response) || createUserResponse.ok
    ? await signIn(dispatch, newUser.username, newUser.password, false)
    : createUserResponse;
}

export async function updateUser(
  dispatch: any,
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
  dispatch: any
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
