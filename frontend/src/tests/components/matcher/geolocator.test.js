// import { Header } from "../../../components/layout/Header";
// import React from "react";
// import Enzyme, { shallow } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// Enzyme.configure({ adapter: new Adapter() });
// import { findByTestAtrr, testStore } from "../../../../Utils";
// import { Map, fromJS } from "immutable";

// const setUp = (initialState = {}) => {
//   const store = testStore(initialState);
//   const wrapper = shallow(<App store={store} />)
//     .childAt(0)
//     .dive();
//   return wrapper;
// };

// describe("App Component", () => {
//   let wrapper;
//   beforeEach(() => {
//     const initialState = fromJS({
//       errors: "a",
//       auth: "auth",
//       message: "m",

//     });
//     wrapper = setUp(state);
//   });

//   it("Should render without errors", () => {
//     const component = findByTestAtrr(wrapper, "geolocator");
//     expect(component.length).toBe(1);
//   });

//   // it('exampleMethod_updatesState Method should update state as expected', () => {
//   //     const classInstance = wrapper.instance();
//   //     classInstance.exampleMethod_updatesState();
//   //     const newState = classInstance.state.hideBtn;
//   //     expect(newState).toBe(true);
//   // });

//   // it('exampleMethod_returnsAValue Method should return value as expected', () => {
//   //     const classInstance = wrapper.instance();
//   //     const newValue = classInstance.exampleMethod_returnsAValue(6);
//   //     expect(newValue).toBe(7);
//   // });
// });
