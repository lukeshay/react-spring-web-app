import { Session } from "./session";
import { User } from "./user";

export interface AuthBody {
  user: User;
  session: Session;
}
