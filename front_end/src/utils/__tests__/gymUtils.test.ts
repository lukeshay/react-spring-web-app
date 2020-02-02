import * as GymUtils from "../gymUtils";
import * as TypeMocks from "../../__mocks__/typeMocks";

describe("GymUtils", () => {
  it("get whether user is authorized.", () => {
    expect(
      GymUtils.isAuthorizedEditor(TypeMocks.testGym, TypeMocks.testUser)
    ).toBeTruthy();
    TypeMocks.testUser.id = "1";
    expect(
      GymUtils.isAuthorizedEditor(TypeMocks.testGym, TypeMocks.testUser)
    ).toBeFalsy();
  });

  it("get the wall by id", () => {
    expect(
      GymUtils.getWallById(TypeMocks.testGym, TypeMocks.testWallOne.id)
    ).toBe(TypeMocks.testWallOne);
    expect(
      GymUtils.getWallById(TypeMocks.testGym, TypeMocks.testWallTwo.id)
    ).toBe(TypeMocks.testWallTwo);
    expect(GymUtils.getWallById(TypeMocks.testGym, "id")).toBeUndefined();
  });

  it("get the route by id", () => {
    expect(
      GymUtils.getRouteById(TypeMocks.testWallOne, TypeMocks.testRouteOne.id)
    ).toBe(TypeMocks.testRouteOne);
    expect(
      GymUtils.getRouteById(TypeMocks.testWallOne, TypeMocks.testRouteTwo.id)
    ).toBe(TypeMocks.testRouteTwo);
    expect(GymUtils.getRouteById(TypeMocks.testWallOne, "id")).toBeUndefined();
  });
});
