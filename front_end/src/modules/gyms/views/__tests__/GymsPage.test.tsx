import React from "react";
import GymsPage from "../GymsPage";
import GymsStoreMock from "../../../../__mocks__/gymsStoreMock";
import { IGymsContextState } from "../../../../context/gyms/gymsStore";
import * as TypeMocks from "../../../../__mocks__/typeMocks";
import { shallow } from "../../../../../configs/setupEnzyme";
import { shallowToJson } from "enzyme-to-json";

const mockGymsState: IGymsContextState = {
  gyms: [TypeMocks.testGymOne, TypeMocks.testGymTwo]
};

describe("<GymsPage />", () => {
  it("should render correctly", () => {
    const gymsPage = shallow(
      <GymsStoreMock state={mockGymsState} dispatch={() => {}}>
        <GymsPage />
      </GymsStoreMock>
    );

    expect(shallowToJson(gymsPage)).toMatchSnapshot();



  });
});
