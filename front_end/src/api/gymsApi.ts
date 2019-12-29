import { handleError } from "./apiUtils";

const baseUrl = process.env.BASE_URL + "gyms";

export const getGyms = async (): Promise<void | Response> => {
  return fetch(baseUrl)
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
};
