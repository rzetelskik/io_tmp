import { LoginForm } from "../../../components/auth/LoginForm";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../../Utils";

describe("Login Form Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        login: jest.fn(),
        isAuthenticated: true,
      };
      const propsErr = checkProps(LoginForm, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    it("Should redirect to user panel", () => {
      let wrapper;

      const props = {
        login: jest.fn(),
        isAuthenticated: true,
      };
      wrapper = shallow(<LoginForm {...props} />);

      const component = findByTestAtrr(wrapper, "redirect");
      expect(component.length).toBe(1);
    });

    it("Should render login form", () => {
      let wrapper;

      const props = {
        login: jest.fn(),
        isAuthenticated: false,
      };
      wrapper = shallow(<LoginForm {...props} />);

      const component = findByTestAtrr(wrapper, "login-form");
      expect(component.length).toBe(1);
    });
  });
});
