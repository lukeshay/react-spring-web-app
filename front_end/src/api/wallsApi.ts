import { Wall } from "../types";
import { handleError } from "./apiUtils";
import * as Cookies from "../utils/cookiesUtils";

const baseUrl = process.env.BASE_URL + "wall";

export const getWalls = async (gymId: string): Promise<void | Response> => {
  return fetch(baseUrl + "/" + gymId)
    .then((response: Response) => {
      return response;
    })
    .catch(handleError);
};

export const createWall = async (wall: Wall): Promise<void | Response> => {
  return fetch(baseUrl, {
    body: JSON.stringify(wall),
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken()
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

export const updateWall = async (wall: Wall): Promise<void | Response> => {
  return fetch(baseUrl, {
    body: JSON.stringify(wall),
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken()
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

export const deleteWall = async (wallId: string): Promise<void | Response> => {
  return fetch(baseUrl + "/" + wallId, {
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
