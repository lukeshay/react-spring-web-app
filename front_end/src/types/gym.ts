import { Wall } from ".";

export interface Gym {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  website: string;
  email: string;
  phoneNumber: string;
  authorizedEditors: string[];
  walls: Wall[] | null;
  photoUrl: string;
  logoUrl: string;
}
