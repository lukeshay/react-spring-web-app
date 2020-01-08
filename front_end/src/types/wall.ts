import { Route } from "./route";

export interface Wall {
  id: string;
  name: string;
  routes: Route[];
  type: string;
}
