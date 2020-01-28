import { User } from "./user";
import { Session } from "./session";

export interface AuthBody {
  user: User;
  session: Session;
}
