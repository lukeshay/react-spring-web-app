import * as GymsApi from "../../api/gymsApi";
import * as RouteRatingsApi from "../../api/routeRatingsApi";
import * as RoutesApi from "../../api/routesApi";
import * as WallsApi from "../../api/wallsApi";
import { Gym, GymPage, Route, RouteRating, Wall, WallPage } from "../../types";
import Types from "./gymsActionTypes";
import { IGymsContextAction } from "./gymsStore";
import { Dispatch } from "react";

export const loadGyms = (
  dispatch: Dispatch<IGymsContextAction>
): Promise<void | Response> => {
  return GymsApi.getGyms("").then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: GymPage) => {
        dispatch({
          actionType: Types.LOAD_GYMS,
          gyms: body.content
        } as IGymsContextAction);
      });

      return response;
    }
  });
};

export const loadGymsQuery = (
  dispatch: Dispatch<IGymsContextAction>,
  query: string
): Promise<void | Response> => {
  return GymsApi.getGyms(query).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: GymPage) => {
        dispatch({
          actionType: Types.LOAD_GYMS,
          gyms: body.content
        } as IGymsContextAction);
      });

      return response;
    }
  });
};

export const loadGymV2 = (
  dispatch: Dispatch<IGymsContextAction>,
  gymId: string
): Promise<void | Response> => {
  return GymsApi.getGymV2(gymId).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym) => {
        console.log(body);

        dispatch({
          actionType: Types.UPDATE_GYM,
          gym: body
        } as IGymsContextAction);
      });
    }

    return response;
  });
};

export const loadWalls = (
  dispatch: Dispatch<IGymsContextAction>,
  gym: Gym
): Promise<void | Response> => {
  return WallsApi.getWalls(gym.id).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: WallPage) => {
        gym.walls = body.content;

        dispatch({
          actionType: Types.UPDATE_GYM,
          gym
        } as IGymsContextAction);
      });
    }

    return response;
  });
};

export const loadRoutes = (
  dispatch: Dispatch<IGymsContextAction>,
  gym: Gym,
  wallId: string
): Promise<void | Response> => {
  return RoutesApi.getRoutesOfWall(wallId).then((response: Response) => {
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
  });
};

export const updateGym = async (
  dispatch: Dispatch<IGymsContextAction>,
  updatedGym: Gym
): Promise<void | Response> => {
  return GymsApi.updateGym(updatedGym).then((response: Response) => {
    // if (response instanceof Response && response.ok) {
    //   response.json().then((body: Gym) => {
    //     dispatch({
    //       actionType: Types.UPDATE_GYM,
    //       gym: { ...body, walls: oldGym.walls }
    //     } as IGymsContextAction);
    //   });
    // }

    return response;
  });
};

export const updateGymPhoto = async (
  dispatch: Dispatch<IGymsContextAction>,
  file: File,
  gym: Gym
): Promise<void | Response> => {
  return GymsApi.updateGymPhoto(file, gym.id).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym) => {
        dispatch({
          actionType: Types.UPDATE_GYM,
          gym: { ...body, walls: gym.walls }
        } as IGymsContextAction);
      });
    }

    return response;
  });
};

export const updateGymLogo = async (
  dispatch: Dispatch<IGymsContextAction>,
  file: File,
  gym: Gym
): Promise<void | Response> => {
  return GymsApi.updateGymLogo(file, gym.id).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      response.json().then((body: Gym) => {
        dispatch({
          actionType: Types.UPDATE_GYM,
          gym: { ...body, walls: gym.walls }
        } as IGymsContextAction);
      });
    }

    return response;
  });
};

export const createWall = async (
  dispatch: Dispatch<IGymsContextAction>,
  wall: Wall,
  gymId: string
): Promise<void | Response> => {
  return WallsApi.createWall(wall).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const updateWall = async (
  dispatch: Dispatch<IGymsContextAction>,
  wall: Wall,
  gymId: string
): Promise<void | Response> => {
  return WallsApi.updateWall(wall).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const deleteWall = async (
  dispatch: Dispatch<IGymsContextAction>,
  wallId: string,
  gymId: string
): Promise<void | Response> => {
  return WallsApi.deleteWall(wallId).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const createRoute = async (
  dispatch: Dispatch<IGymsContextAction>,
  route: Route,
  gymId: string
): Promise<void | Response> => {
  return RoutesApi.createRoute(route).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const updateRoute = async (
  dispatch: Dispatch<IGymsContextAction>,
  route: Route,
  gymId: string
): Promise<void | Response> => {
  return RoutesApi.updateRoute(route).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const deleteRoute = async (
  dispatch: Dispatch<IGymsContextAction>,
  route: Route,
  gymId: string
): Promise<void | Response> => {
  return RoutesApi.deleteRoute(route).then((response: Response) => {
    if (response instanceof Response && response.ok) {
      return loadGymV2(dispatch, gymId);
    } else {
      return response;
    }
  });
};

export const createRouteRating = async (
  dispatch: Dispatch<IGymsContextAction>,
  rating: RouteRating,
  gymId: string
): Promise<void | Response> => {
  return RouteRatingsApi.createRouteRating(rating).then(
    (response: Response) => {
      if (response instanceof Response && response.ok) {
        return loadGymV2(dispatch, gymId);
      } else {
        return response;
      }
    }
  );
};
