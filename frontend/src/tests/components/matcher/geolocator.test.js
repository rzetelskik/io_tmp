import Geolocator from "../../../components/matcher/Geolocator";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../../Utils";

describe("App Component", () => {
  it("Should render without errors", () => {
    const component = shallow(<Geolocator />);
    const wrapper = findByTestAtrr(component, "geolocator");
    expect(wrapper.length).toBe(1);
  });
});
