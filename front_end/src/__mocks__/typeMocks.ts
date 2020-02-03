import { Gym, Route, User, Wall } from "../types";

export const testRouteOne: Route = {
  id: "route1",
  wallId: "wall1",
  gymId: "gym1",
  name: "RouteOne",
  setter: "Luke",
  holdColor: "Blue",
  types: ["TOP_ROPE", "LEAD"],
  averageGrade: "GRADE_5_9",
  averageRating: 4
};

export const testRouteTwo: Route = {
  id: "route2",
  wallId: "wall1",
  gymId: "gym1",
  name: "RouteTwo",
  setter: "Luke",
  holdColor: "Blue",
  types: ["TOP_ROPE", "LEAD"],
  averageGrade: "GRADE_5_12ab",
  averageRating: 4
};

export const testWallOne: Wall = {
  id: "wall1",
  gymId: "gym1",
  name: "Wall1",
  routes: [testRouteOne, testRouteTwo],
  types: ["LEAD", "TOP_ROPE"]
};

export const testWallTwo: Wall = {
  id: "wall2",
  gymId: "gym1",
  name: "Wall1",
  routes: [],
  types: ["LEAD", "TOP_ROPE"]
};

export const testGymOne: Gym = {
  address: "1234 Five Street",
  authorizedEditors: ["id"],
  city: "Ames",
  email: "abc@d.com",
  id: "gym1",
  logoUrl: "",
  name: "Gym One",
  phoneNumber: "1234567890",
  photoUrl: "",
  state: "Iowa",
  walls: [testWallOne, testWallTwo],
  website: "lukeshay.com",
  zipCode: "50014"
};

export const testGymTwo: Gym = {
  address: "1234 Five Street",
  authorizedEditors: ["id"],
  city: "Ames",
  email: "abc@d.com",
  id: "gym2",
  logoUrl: "",
  name: "Gym Two",
  phoneNumber: "1234567890",
  photoUrl: "",
  state: "Iowa",
  walls: [testWallOne, testWallTwo],
  website: "lukeshay.com",
  zipCode: "50014"
};

export const testUser: User = {
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
