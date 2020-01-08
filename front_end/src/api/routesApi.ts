import { handleError } from "./apiUtils";

const baseUrl = process.env.BASE_URL + "routes";

export const getRoutesOfWall = async (wallId: string) => {
  return fetch(baseUrl + "/" + wallId)
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
};
