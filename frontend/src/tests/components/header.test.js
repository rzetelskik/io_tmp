import { Header } from "../../components/layout/Header";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../Utils";
import { Map, fromJS } from "immutable";

describe("Header Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        auth: new Map(),
        logout: jest.fn(),
      };
      const propsErr = checkProps(Header, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    it("Should render without errors", () => {
      let wrapper;

      const props = {
        auth: fromJS({}),
        logout: jest.fn(),
      };
      wrapper = shallow(<Header {...props} />);

      const component = findByTestAtrr(wrapper, "header");
      expect(component.length).toBe(1);
    });

    it("Should render user panel and should NOT render guest links", () => {
      let wrapper;

      const props = {
        auth: fromJS({ isAuthenticated: true }),
        logout: jest.fn(),
      };
      wrapper = shallow(<Header {...props} />);
      const component1 = findByTestAtrr(wrapper, "authenticated");
      expect(component1.length).toBe(1);
      const component2 = findByTestAtrr(wrapper, "guest");
      expect(component2.length).toBe(0);
    });

    it("Should NOT render user panel and should render guest links", () => {
      let wrapper;

      const props = {
        auth: fromJS({ isAuthenticated: false }),
        logout: jest.fn(),
      };
      wrapper = shallow(<Header {...props} />);
      const component1 = findByTestAtrr(wrapper, "authenticated");
      expect(component1.length).toBe(0);
      const component2 = findByTestAtrr(wrapper, "guest");
      expect(component2.length).toBe(1);
    });
  });
});
