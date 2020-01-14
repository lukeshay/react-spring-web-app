import { Route } from "../types";
import * as Cookies from "../utils/cookiesUtils";
import { handleError } from "./apiUtils";

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
      Authorization: Cookies.getJwtToken(),
      "Content-Type": "application/json"
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
      Authorization: Cookies.getJwtToken(),
      "Content-Type": "application/json"
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
      Authorization: Cookies.getJwtToken(),
      "Content-Type": "application/json"
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
