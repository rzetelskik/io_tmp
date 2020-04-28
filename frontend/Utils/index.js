import checkPropTypes from "check-prop-types";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

export const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  //console.log(component.debug());
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
  return propsErr;
};

const mockStore = configureStore([thunk]);
export const makeMockStore = (state = {}) => {
  return mockStore({
    ...state,
  });
};
