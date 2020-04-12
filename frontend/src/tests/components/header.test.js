import { Header } from "../../components/layout/Header";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../Utils";

export const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};

const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
};

describe("Header Component", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      auth: new Object(),
      logout: jest.fn(),
    };
    const propsErr = checkProps(Header, expectedProps);
    expect(propsErr).toBeUndefined();
  });
  describe("Renders", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        auth: new Object(),
        logout: jest.fn(),
      };
      wrapper = shallow(<Header {...props} />);
    });

    it("Should render a header", () => {
      const header = findByTestAtrr(wrapper, "header");
      expect(header.length).toBe(1);
    });
  });
});
