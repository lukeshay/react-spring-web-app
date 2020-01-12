import { handleError } from "./apiUtils";
import { Wall } from "../types";
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
