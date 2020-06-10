import { UpdateDetailsContainer } from "../../../components/auth/UpdateDetailsContainer";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../../Utils";

describe("update details form component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        first_name: "",
        last_name: "",
        location_range: "",
        updateDetails: jest.fn(),
        createMessage: jest.fn(),
      };
      const propsErr = checkProps(UpdateDetailsContainer, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    it("Should redirect to user panel", () => {
      let wrapper;

      const props = {
        first_name: "name",
        last_name: "surname",
        location_range: "",
        updateDetails: jest.fn(),
        createMessage: jest.fn(),
      };
      wrapper = shallow(<UpdateDetailsContainer {...props} />);

      const component = findByTestAtrr(wrapper, "form");
      expect(component.length).toBe(1);
    }); //
  });
});
