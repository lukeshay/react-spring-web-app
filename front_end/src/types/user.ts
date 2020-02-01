import { Session } from "./session";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  country: string;
  state: string;
  password: string;
  phoneNumber: string;
  authorities: string[];
  roles: string[];
  session: Session | null;
}
