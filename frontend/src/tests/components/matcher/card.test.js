import { Card } from "../../../components/matcher/Card";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../../Utils";

describe("Header Component", () => {
  const expectedProps = {
    firstName: "firstName",
    distance: "distance",
    commonTags: [],
  };
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const propsErr = checkProps(Card, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    it("Should render without errors", () => {
      let wrapper;

      wrapper = shallow(<Card {...expectedProps} />);

      const component = findByTestAtrr(wrapper, "card");
      expect(component.length).toBe(1);
    });
  });
});
