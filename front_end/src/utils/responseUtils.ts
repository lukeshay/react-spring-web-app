import { toast } from "react-toastify";

export const isOk = (response: Response | void): boolean =>
  response !== undefined && response instanceof Response && response.ok;

export const toastIfNotOk = (
  response: Response,
  toastMessage: string
): void => {
  if (!isOk(response)) {
    toast.error(toastMessage);
  }
};
