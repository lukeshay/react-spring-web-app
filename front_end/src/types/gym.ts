import { Wall } from "./wall";

export interface Gym {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  website: string;
  email: string;
  phoneNumber: string;
  authorizedEditors: string[];
  walls: Wall[];
}
