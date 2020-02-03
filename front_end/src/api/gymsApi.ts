import { Gym } from "../types";
import { handleError } from "./apiUtils";
import * as Cookies from "../utils/cookiesUtils";

const baseUrl = process.env.BASE_URL;
const gymsUrl = baseUrl + "gyms";
const gymsV2Url = baseUrl + "v2/gyms";

export const getGyms = async (query: string): Promise<void | Response> => {
  return fetch(gymsUrl + "?query=" + query)
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

export const updateGym = async (updatedGym: Gym): Promise<void | Response> => {
  return fetch(gymsUrl + "/" + updatedGym.id, {
    body: JSON.stringify(updatedGym),
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.getJwtToken(),
      Refresh: Cookies.getRefreshToken()
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

export const updateGymPhoto = async (
  file: File,
  gymId: string
): Promise<void | Response> => {
  const data = new FormData();
  data.append("file", file);
  data.append("gymId", gymId);

  return fetch(gymsUrl + "/image/gym", {
    body: data,
    headers: {
      Authorization: Cookies.getJwtToken(),
      Refresh: Cookies.getRefreshToken()
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

export const updateGymLogo = async (
  file: File,
  gymId: string
): Promise<void | Response> => {
  const data = new FormData();
  data.append("file", file);
  data.append("gymId", gymId);

  return fetch(gymsUrl + "/image/logo", {
    body: data,
    headers: {
      Authorization: Cookies.getJwtToken(),
      Refresh: Cookies.getRefreshToken()
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
