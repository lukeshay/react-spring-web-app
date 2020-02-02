import React from "react";
import ProfilePage from "../ProfilePage";
import { IUserContextState } from "../../../context/user/userStore";
import { mount, shallow } from "../../../../configs/setupEnzyme";
import UserStoreMock from "../../../__mocks__/userStoreMock";
import * as TypeMocks from "../../../__mocks__/typeMocks";

describe("<ProfilePage /> ", () => {
  it("should render sign up form.", function() {
    const mockState: IUserContextState = { user: null };

    const profilePage = shallow(
      <UserStoreMock state={mockState} dispatch={() => {}}>
        <ProfilePage />
      </UserStoreMock>
    );

    expect(profilePage.find("#signIn")).toBeDefined();
    expect(profilePage.find("#firstName")).toBeDefined();
    expect(profilePage.find("#lastName")).toBeDefined();
    expect(profilePage.find("#email")).toBeDefined();
    expect(profilePage.find("#phoneNumber")).toBeDefined();
    expect(profilePage.find("#password")).toBeDefined();
    expect(profilePage.find("#repeatPassword")).toBeDefined();
  });

  it("should render sign in form.", () => {
    const mockState: IUserContextState = {
      user: null
    };

    const profilePage = mount(
      <UserStoreMock state={mockState} dispatch={() => {}}>
        <ProfilePage />
      </UserStoreMock>
    );

    profilePage.find("button[id='signIn']").simulate("click");

    expect(profilePage.find("#signUp")).toBeDefined();
    expect(profilePage.find("#email")).toBeDefined();
    expect(profilePage.find("#password")).toBeDefined();
    expect(profilePage.find("#rememberMe")).toBeDefined();
  });

  it("should render profile form.", () => {
    const mockState: IUserContextState = {
      user: TypeMocks.testUser
    };

    const profilePage = mount(
      <UserStoreMock state={mockState} dispatch={() => {}}>
        <ProfilePage />
      </UserStoreMock>
    );

    expect(profilePage.find("#signOut")).toBeDefined();
    expect(profilePage.find("#firstName")).toBeDefined();
    expect(profilePage.find("#lastName")).toBeDefined();
    expect(profilePage.find("#email")).toBeDefined();
    expect(profilePage.find("#phoneNumber")).toBeDefined();
  });
});
