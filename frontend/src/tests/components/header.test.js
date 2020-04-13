import { Header } from "../../components/layout/Header";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import { findByTestAtrr, checkProps } from "../../../Utils";
import { Map } from "immutable";

const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
};

// describe("Header Component", () => {
//   describe("Checking PropTypes", () => {
//     it("Should not throw a warning", () => {
//       const expectedProps = {
//         auth: new Object(),
//         logout: jest.fn(),
//       };
//       const propsErr = checkProps(Header, expectedProps);
//       expect(propsErr).toBeUndefined();
//     });
//   });
//   describe("Renders", () => {
//     // let wrapper;
//     // beforeEach(() => {
//     //   const props = {
//     //     auth: new Object(),
//     //     logout: jest.fn(),
//     //   };
//     //   wrapper = setUp(props);
//     // });

//     it("Should render a header", () => {
//       let wrapper;
//       wrapper = setUp();
//       const header = wrapper.find("header");
//       expect(header.length).toBe(1);
//     });
//   });
// });

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
    let wrapper;

    beforeEach(() => {
      const props = {
        auth: new Map(),
        logout: jest.fn(),
      };
      wrapper = shallow(<Header {...props} />);
    });

    it("Should render without errors", () => {
      const component = findByTestAtrr(wrapper, "header");
      expect(component.length).toBe(1);
    });

    // it("Should render a H1", () => {
    //   const h1 = findByTestAtrr(wrapper, "header");
    //   expect(h1.length).toBe(1);
    // });

    // it("Should render a desc", () => {
    //   const desc = findByTestAtrr(wrapper, "desc");
    //   expect(desc.length).toBe(1);
    // });
  });

  // let component;
  // beforeEach(() => {
  //   component = setUp();
  // });
  // it("should render without errors", () => {
  //   const component = setUp();
  //   const wrapper = component.find("header");
  //   expect(wrapper.length).toBe(1);
  // });
});
