import reducer from "../../reducers/message";
import * as types from "../../actions/types";
import { fromJS } from "immutable";

describe("message reducer", () => {
  const initialState = fromJS({});

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle CREATE_MESSAGE", () => {
    expect(
      reducer(initialState, {
        type: types.CREATE_MESSAGE,
      })
    ).toEqual(fromJS({}));
  });
});
