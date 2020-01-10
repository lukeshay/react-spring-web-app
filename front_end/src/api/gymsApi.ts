import { handleError } from "./apiUtils";

const baseUrl = process.env.BASE_URL;
const gymsUrl = baseUrl + "gyms";
const gymsV2Url = baseUrl + "v2/gyms";

export const getGyms = async (): Promise<void | Response> => {
  return fetch(gymsUrl)
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
};

export const getGymV2 = async (gymId: string): Promise<void | Response> => {
  return fetch(gymsV2Url + "/" + gymId)
    .then(
      (response: Response): Response => {
        return response;
      }
    )
    .catch(handleError);
};
