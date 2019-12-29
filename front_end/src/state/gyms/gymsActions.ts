import * as GymsApi from "../../api/gymsApi";
import dispatcher from "../../appDispatcher";
import Types from "./gymsActionTypes";
import { IAction } from "./gymsStore";

export const loadGyms = async () => {
  const response = await GymsApi.getGyms();

  if (response instanceof Response && response.ok) {
    const body = await response.json();

    dispatcher.dispatch({
      actionType: Types.LOAD_GYMS,
      gyms: body
    } as IAction);
  }

  return response;
};
