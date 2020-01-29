import { Wall } from "../types";
import { handleError, jsonHeaders } from "./apiUtils";

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
    headers: jsonHeaders,
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
    headers: jsonHeaders,
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
    headers: jsonHeaders,
    method: "DELETE"
  })
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
};
