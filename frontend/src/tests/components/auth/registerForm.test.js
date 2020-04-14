import { RegisterForm } from "../../../components/auth/RegisterForm";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../../Utils";

describe("Register Form Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        isAuthenticated: false,
        register: jest.fn(),
      };
      const propsErr = checkProps(RegisterForm, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    it("Should redirect to user panel", () => {
      let wrapper;

      const props = {
        register: jest.fn(),
        isAuthenticated: true,
      };
      wrapper = shallow(<RegisterForm {...props} />);

      const component = findByTestAtrr(wrapper, "redirect");
      expect(component.length).toBe(1);
    });

    it("Should render login form", () => {
      let wrapper;

      const props = {
        register: jest.fn(),
        isAuthenticated: false,
      };
      wrapper = shallow(<RegisterForm {...props} />);

      const component = findByTestAtrr(wrapper, "register-form");
      expect(component.length).toBe(1);
    });
  });
});
