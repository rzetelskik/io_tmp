import { Card } from "../../../components/matcher/Card";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../../Utils";

describe("Header Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        onUserAccept: "value1",
        onUserDeny: "value2",
        first_name: "value3",
        distance: "value4",
      };
      const propsErr = checkProps(Card, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    it("Should render without errors", () => {
      let wrapper;

      const props = {
        onUserAccept: "value1",
        onUserDeny: "value2",
        first_name: "value3",
        distance: "value4",
      };
      wrapper = shallow(<Card />);

      const component = findByTestAtrr(wrapper, "card");
      expect(component.length).toBe(1);
    });
  });
}); //
