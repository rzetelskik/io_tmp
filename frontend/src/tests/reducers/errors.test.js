import reducer from "../../containers/main-panel/reducer";
import * as types from "../../actions/types";
import { fromJS } from "immutable";

describe("geolocation reducer", () => {
  const initialState = fromJS({
    msg: {},
    status: null,
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle CREATE_ERROR", () => {
    expect(
      reducer(initialState, {
        payload: {
          msg: { smth: ["some message", "other message"] },
          status: 3,
        },
        type: types.CREATE_ERROR,
      })
    ).toEqual(
      fromJS({
        msg: {
          smth: ["some message", "other message"],
        },
        status: 3,
      })
    );
  });
});
