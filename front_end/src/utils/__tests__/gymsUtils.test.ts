import * as GymUtils from "../gymsUtils";
import { Gym, User } from "../../types";

const testGym: Gym = {
  address: "1234 Five Street",
  authorizedEditors: ["id"],
  city: "Ames",
  email: "abc@d.com",
  id: "123",
  logoUrl: "",
  name: "Gym",
  phoneNumber: "1234567890",
  photoUrl: "",
  state: "Iowa",
  walls: [],
  website: "lukeshay.com",
  zipCode: "50014"
};

const testUser: User = {
  username: "username",
  email: "email",
  password: "password",
  id: "id",
  authority: "ADMIN",
  country: "USA",
  state: "IA",
  firstName: "Name",
  lastName: "Last",
  phoneNumber: "1111111111",
  role: "ADMIN_ROLE",
  session: null
};

describe("GymUtils", () => {
  it("get whether user is authorized.", () => {
    expect(GymUtils.isAuthorizedEditor(testGym, testUser)).toBeTruthy();
    testUser.id = "1";
    expect(GymUtils.isAuthorizedEditor(testGym, testUser)).toBeFalsy();
  });
});
