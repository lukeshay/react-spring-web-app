import { handleError } from "./apiUtils";

const baseUrl = process.env.BASE_URL;
const routeRatingsUrl = baseUrl + "ratings/routes";

export const getRouteRatings = (routeId: string): Promise<void | Response> => {
  return fetch(routeRatingsUrl + "/" + routeId)
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
};
