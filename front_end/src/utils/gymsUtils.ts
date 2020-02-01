import { Gym, Route, User, Wall } from "../types";

export const getGymByWallId = (gyms: Gym[], wallId: string): Gym | undefined =>
  gyms
    .filter(
      (element) =>
        element.walls &&
        element.walls.filter((elementWall) => elementWall.id === wallId)
          .length > 0
    )
    .pop();

export const getGymById = (gyms: Gym[], gymId: string): Gym | undefined =>
  gyms.filter((element) => element.id && element.id === gymId).pop();

export const isAuthorizedEditor = (gym: Gym, user: User): boolean =>
  gym.authorizedEditors !== undefined &&
  gym.authorizedEditors.find((editorId: string) => editorId === user.id) !==
    undefined;

export const getWallById = (gym: Gym, wallId: string): Wall | undefined =>
  gym.walls ? gym.walls.find((wall) => wall.id === wallId) : undefined;

export const getRouteById = (wall: Wall, routeId: string): Route | undefined =>
  wall.routes ? wall.routes.find((route) => route.id === routeId) : undefined;

export const parseTypesToString = (route: Route): string => {
  let types = "";

  route.types.forEach((value) => {
    if (types.length !== 0) {
      types += ", ";
    }

    if (value === "LEAD") {
      types += "Lead";
    }

    if (value === "TOP_ROPE") {
      types += "Top rope";
    }

    if (value === "BOULDER") {
      types += "Boulder";
    }

    if (value === "AUTO_BELAY") {
      types += "Auto belay";
    }
  });

  return types;
};
