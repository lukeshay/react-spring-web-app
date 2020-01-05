import { handleError } from "./apiUtils";

const baseUrl = process.env.BASE_URL + "wall";

export const getWalls = async (gymId: string): Promise<void | Response> => {
  return fetch(baseUrl + "/" + gymId)
    .then((response: Response) => {
      return response;
    })
    .catch(handleError);
};
