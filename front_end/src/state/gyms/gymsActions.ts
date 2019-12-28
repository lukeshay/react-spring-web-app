import * as GymsApi from "../../api/gymsApi";
import dispatcher from "../../appDispatcher";
import { ActionInterface } from "../gymsStore";
import Types from "./gymsActionTypes";

export const loadGyms = async () => {
  const response = GymsApi.getGyms();

  if (response instanceof Response && response.ok) {
    const body = await response.json();

    dispatcher.dispatch({
      actionType: Types.LOAD_GYMS,
      gyms: body
    } as ActionInterface);
  }

  return response;
};
