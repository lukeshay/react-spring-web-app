import * as GymsApi from "../../api/gymsApi";
import * as RoutesApi from "../../api/routesApi";
import * as WallsApi from "../../api/wallsApi";
import { Gym, Route, Wall } from "../../types";
import Types from "./gymsActionTypes";
import { IGymsContextAction } from "./gymsStore";

export const loadGyms = (dispatch: any) => {
  const responsePromise = GymsApi.getGyms().then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym[]) => {
        dispatch({
          actionType: Types.LOAD_GYMS,
          gyms: body
        } as IGymsContextAction);
      });

      return response;
    }
  });

  return responsePromise;
};

export const loadGymV2 = (dispatch: any, gymId: string) => {
  const responsePromise = GymsApi.getGymV2(gymId).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym) => {
        dispatch({
          actionType: Types.UPDATE_GYM,
          gym: body
        } as IGymsContextAction);
      });
    }

    return response;
  });

  return responsePromise;
};

export const loadWalls = (dispatch: any, gym: Gym) => {
  const responsePromise = WallsApi.getWalls(gym.id).then(
    (response: Response) => {
      if (response instanceof Response && response.ok) {
        response.json().then((body: Wall[]) => {
          gym.walls = body;

          dispatch({
            actionType: Types.UPDATE_GYM,
            gym
          } as IGymsContextAction);
        });
      }

      return response;
    }
  );

  return responsePromise;
};

export const loadRoutes = (dispatch: any, gym: Gym, wallId: string) => {
  const responsePromise = RoutesApi.getRoutesOfWall(wallId).then(
    (response: Response) => {
      if (response instanceof Response && response.ok) {
        response.json().then((body: Route[]) => {
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
        });
      }

      return response;
    }
  );

  return responsePromise;
};

export const updateGym = async (
  dispatch: any,
  updatedGym: Gym,
  oldGym: Gym
) => {
  const responsePromise = GymsApi.updateGym(updatedGym).then(
    (response: Response) => {
      if (response instanceof Response && response.ok) {
        response.json().then((body: Gym) => {
          dispatch({
            actionType: Types.UPDATE_GYM,
            gym: { ...body, walls: oldGym.walls }
          } as IGymsContextAction);
        });
      }

      return response;
    }
  );

  return responsePromise;
};

export const createWall = async (dispatch: any, wall: Wall, gymId: string) => {
  const responsePromise = WallsApi.createWall(wall).then(
    (response: Response) => {
      if (response instanceof Response && response.ok) {
        return loadGymV2(dispatch, gymId);
      } else {
        return response;
      }
    }
  );

  return responsePromise;
};

export const updateWall = async (dispatch: any, wall: Wall, gymId: string) => {
  const responsePromise = WallsApi.updateWall(wall).then(
    (response: Response) => {
      if (response instanceof Response && response.ok) {
        return loadGymV2(dispatch, gymId);
      } else {
        return response;
      }
    }
  );

  return responsePromise;
};

export const deleteWall = async (
  dispatch: any,
  wallId: string,
  gymId: string
) => {
  const responsePromise = WallsApi.deleteWall(wallId).then(
    (response: Response) => {
      if (response instanceof Response && response.ok) {
        return loadGymV2(dispatch, gymId);
      } else {
        return response;
      }
    }
  );

  return responsePromise;
};
