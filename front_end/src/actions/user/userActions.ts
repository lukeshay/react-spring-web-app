import dispatcher from "../../appDispatcher";
import { User } from "../../models/index";
import * as UserApi from "../../rest-api/userRestApi";
import * as Cookies from "../../utils/cookiesUtils";
import Types from "./userActionTypes";

export async function signOut(): Promise<void> {
  dispatcher.dispatch({
    actionType: Types.SIGN_OUT
  });
}

export async function signIn(
  username: string,
  password: string
): Promise<void | Response> {
  const signInResponse = await UserApi.signIn(username, password);

  if (!(signInResponse instanceof Response) || !signInResponse.ok) {
    return signInResponse;
  }

  const signInBody = await signInResponse.json();
  const jwtToken = signInBody.Authorization;

  Cookies.setJwtToken(jwtToken);

  const getUserResponse = await UserApi.getUser(username);

  if (getUserResponse instanceof Response && getUserResponse.ok) {
    const getUserBody = await getUserResponse.json();

    Cookies.setUsername(getUserBody.username);
    Cookies.setUserId(getUserBody.userId);

    dispatcher.dispatch({
      actionType: Types.SIGN_IN,
      user: getUserBody
    });
  }

  return getUserResponse;
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
