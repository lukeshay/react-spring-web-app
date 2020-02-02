import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Main from "../main";

describe("<Main />", () => {
  it("should render correctly", () => {
    const output = shallow(<Main />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
