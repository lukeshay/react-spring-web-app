import { RouteRatingJwt } from "./routeRatingJwt";

export interface Session {
  id: string;
  tokens: RouteRatingJwt;
  userId: string;
}
