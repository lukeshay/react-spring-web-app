import * as Cookies from "../utils/cookiesUtils";

export function handleError(error: Error): void {
  // tslint:disable-next-line:no-console
  console.error("API call failed. " + error);
  throw error;
}

export const authHeaders = {
  Authorization: Cookies.getJwtToken(),
  Refresh: Cookies.getRefreshToken()
};

export const jsonHeaders = {
  "Content-Type": "application/json",
  ...authHeaders
};
