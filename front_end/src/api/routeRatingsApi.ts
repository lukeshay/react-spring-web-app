import { RouteRating } from "../types";
import * as Cookies from "../utils/cookiesUtils";
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

export const createRouteRating = (
  rating: RouteRating
): Promise<void | Response> => {
  return fetch(routeRatingsUrl, {
    body: JSON.stringify(rating),
    headers: {
      Authorization: Cookies.getJwtToken(),
      "Content-Type": "application/json"
    },
    method: "POST"
  });
};
