import * as GymsApi from "../../api/gymsApi";
import * as RoutesApi from "../../api/routesApi";
import * as WallsApi from "../../api/wallsApi";
import { Gym, Route, Wall } from "../../types";
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

export const loadWalls = async (dispatch: any, gym: Gym) => {
  const response = await WallsApi.getWalls(gym.id);

  if (response instanceof Response && response.ok) {
    const body: Wall[] = await response.json();

    gym.walls = body;

    dispatch({
      actionType: Types.UPDATE_GYM,
      gym
    } as IGymsContextAction);
  }

  return response;
};

export const loadRoutes = async (dispatch: any, gym: Gym, wallId: string) => {
  const response = await RoutesApi.getRoutesOfWall(wallId);

  if (response instanceof Response && response.ok) {
    const body: Route[] = await response.json();

    if (gym.walls) {
      gym.walls = gym.walls.map((wall: Wall) => {
        if (wallId === wall.id) {
          wall.routes = body;
        }

        return wall;
      });

      dispatch({
        actionType: Types.UPDATE_GYM,
        gym
      } as IGymsContextAction);
    }
  }

  return response;
};
