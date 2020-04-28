import App from "../../components/App";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../Utils";

describe("App Component", () => {
  it("Should render without errors", () => {
    const component = shallow(<App />);
    const wrapper = findByTestAtrr(component, "app");
    expect(wrapper.length).toBe(1);
  });
});
