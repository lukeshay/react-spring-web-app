import { Route } from "../types";
import { handleError } from "./apiUtils";
import * as Cookies from "../utils/cookiesUtils";

const baseUrl = process.env.BASE_URL + "routes";

export const getRoutesOfWall = async (
  wallId: string
): Promise<void | Response> => {
  return fetch(baseUrl + "/" + wallId)
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
};

export const createRoute = async (route: Route): Promise<void | Response> => {
  return fetch(baseUrl, {
    body: JSON.stringify(route),
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken(),
      Refresh: Cookies.getRefreshToken()
    },
    method: "POST"
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
};

export const updateRoute = async (route: Route): Promise<void | Response> => {
  return fetch(baseUrl, {
    body: JSON.stringify(route),
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken(),
      Refresh: Cookies.getRefreshToken()
    },
    method: "PUT"
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
};

export const deleteRoute = async (route: Route): Promise<void | Response> => {
  return fetch(baseUrl, {
    body: JSON.stringify(route),
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken(),
      Refresh: Cookies.getRefreshToken()
    },
    method: "DELETE"
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
};
