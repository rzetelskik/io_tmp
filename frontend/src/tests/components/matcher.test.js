import { Matcher } from "../../components/matcher/Matcher";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../Utils";
import { Map, fromJS } from "immutable";

describe("Matcher Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        getGeolocation: jest.fn(),
        createMessage: jest.fn(),
        coords: new Object(),
        timestamp: 0,
        isLoading: false,
        accepted: false,
        currentMatch: new Object(),
        endMeeting: jest.fn(),
        askForMatch: jest.fn(),
      };
      const propsErr = checkProps(Matcher, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    it("Should render Lodaing..., should NOT render accepted and should NOT render not-accepted", () => {
      let wrapper;

      const props = {
        getGeolocation: jest.fn(),
        coords: new Object(),
        timestamp: 0,
        isLoading: true,
        accepted: false,
        createMessage: jest.fn(),
        currentMatch: null,
        endMeeting: jest.fn(),
        askForMatch: jest.fn(),
      };
      wrapper = shallow(<Matcher {...props} />);
      const component1 = findByTestAtrr(wrapper, "loading");
      expect(component1.length).toBe(1);
      const component2 = findByTestAtrr(wrapper, "accepted");
      expect(component2.length).toBe(0);
      const component3 = findByTestAtrr(wrapper, "not-accepted");
      expect(component3.length).toBe(0);
    });

    it("Should NOT render accepted and should render not accepted", () => {
      let wrapper;

      const props = {
        getGeolocation: jest.fn(),
        coords: new Object(),
        timestamp: 0,
        isLoading: false,
        accepted: false,
        createMessage: jest.fn(),
        currentMatch: null,
        endMeeting: jest.fn(),
        askForMatch: jest.fn(),
      };
      wrapper = shallow(<Matcher {...props} />);
      const component1 = findByTestAtrr(wrapper, "not-accepted");
      expect(component1.length).toBe(1);
      const component2 = findByTestAtrr(wrapper, "accepted");
      expect(component2.length).toBe(0);
    });

    it("Should render accepted and should NOT render not accepted", () => {
      let wrapper;

      const props = {
        getGeolocation: jest.fn(),
        coords: new Object(),
        timestamp: 0,
        isLoading: false,
        accepted: true,
        createMessage: jest.fn(),
        currentMatch: null,
        endMeeting: jest.fn(),
        askForMatch: jest.fn(),
      };
      wrapper = shallow(<Matcher {...props} />);

      const component1 = findByTestAtrr(wrapper, "not-accepted");
      expect(component1.length).toBe(0);
      const component2 = findByTestAtrr(wrapper, "accepted");
      expect(component2.length).toBe(1);
    });
  });
});
