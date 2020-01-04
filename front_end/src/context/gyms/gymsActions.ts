import * as GymsApi from "../../api/gymsApi";
import Types from "./gymsActionTypes";
import { IGymsContextAction } from "./gymsStore";

export const loadGyms = async (dispatch: any) => {
  const response = await GymsApi.getGyms();

  if (response instanceof Response && response.ok) {
    const body = await response.json();

    dispatch({
      actionType: Types.LOAD_GYMS,
      gyms: body
    } as IGymsContextAction);
  }

  return response;
};
