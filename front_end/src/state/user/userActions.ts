import * as UserApi from "../../api/userApi";
import dispatcher from "../../appDispatcher";
import { User } from "../../types";
import * as Cookies from "../../utils/cookiesUtils";
import Types from "./userActionTypes";

export async function signOut(): Promise<void> {
  Cookies.setJwtToken("");
  Cookies.setUsername("");

  dispatcher.dispatch({
    actionType: Types.SIGN_OUT
  });
}

export async function signIn(
  username: string,
  password: string
): Promise<void | Response> {
  const signInResponse = await UserApi.signIn(username, password);

  if (signInResponse instanceof Response && signInResponse.ok) {
    const signInBody = await signInResponse.json();
    const jwtToken = signInBody.Authorization;
    const user = signInBody.user;

    Cookies.setJwtToken(jwtToken);

    dispatcher.dispatch({
      actionType: Types.SIGN_IN,
      user
    });
  }

  return signInResponse;
}

export async function createUser(newUser: User): Promise<void | Response> {
  const createUserResponse = await UserApi.createUser(newUser);

  return !(createUserResponse instanceof Response) || createUserResponse.ok
    ? await signIn(newUser.username, newUser.password)
    : createUserResponse;
}

export async function updateUser(updatedUser: User): Promise<void | Response> {
  const updateUserResponse = await UserApi.updateUser(updatedUser);

  if (updateUserResponse instanceof Response && updateUserResponse.ok) {
    const updatedUserBody = await updateUserResponse.json();

    dispatcher.dispatch({
      actionType: Types.UPDATE_USER,
      user: updatedUserBody
    });
  }

  return updateUserResponse;
}
