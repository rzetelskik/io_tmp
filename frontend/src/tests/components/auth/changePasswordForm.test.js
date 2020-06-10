import { ChangePasswordContainer } from "../../../components/auth/ChangePasswordContainer";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../../Utils";
import { Map, fromJS } from "immutable";

describe("Change Pawssword Form Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        username: "username",
        changePassword: jest.fn(),
      };
      const propsErr = checkProps(ChangePasswordContainer, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        username: "username",
        changePassword: mockFunc,
      };
      wrapper = shallow(<ChangePasswordContainer {...props} />);
      //console.log(wrapper.debug());
    });
    it("Should render without errors", () => {
      const component = findByTestAtrr(wrapper, "changePassword");
      expect(component.length).toBe(1);
    });
    // it("Should emit callback on click event", () => {
    //   const component = findByTestAtrr(wrapper, "changePassword");
    //   component.simulate("change");
    //   const callback = mockFunc.mock.calls.length;
    //   expect(callback).toBe(1);
    // });
  });
});
