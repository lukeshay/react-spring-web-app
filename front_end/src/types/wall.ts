import { Route } from "./route";

export interface Wall {
  id: string;
  gymId: string;
  name: string;
  routes: Route[];
  types: string[];
}
