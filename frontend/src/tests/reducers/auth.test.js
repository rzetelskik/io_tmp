import reducer from "../../reducers/auth";
import * as types from "../../actions/types";
import { fromJS } from "immutable";

describe("auth reducer", () => {
  const initialState = fromJS({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  const initialStateWithToken = fromJS({
    token: "token value",
    isAuthenticated: null,
    isLoading: false,
    user: null,
  });

  it("should handle USER_LOADING", () => {
    expect(
      reducer(fromJS({}), {
        type: types.USER_LOADING,
      })
    ).toEqual(
      fromJS({
        isLoading: true,
      })
    );

    expect(
      reducer(initialStateWithToken, {
        type: types.USER_LOADING,
      })
    ).toEqual(
      fromJS({
        token: "token value",
        isAuthenticated: null,
        user: null,
        isLoading: true,
      })
    );
  });
  it("should handle USER_LOADED", () => {
    expect(
      reducer(fromJS({}), {
        type: types.USER_LOADED,
        payload: "some value",
      })
    ).toEqual(
      fromJS({
        isLoading: false,
        isAuthenticated: true,
        user: "some value",
      })
    );

    expect(
      reducer(initialStateWithToken, {
        type: types.USER_LOADING,
        payload: "some value",
      })
    ).toEqual(
      fromJS({
        token: "token value",
        isAuthenticated: null,
        user: null,
        isLoading: true,
      })
    );
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      reducer(fromJS({}), {
        type: types.LOGIN_SUCCESS,
        payload: { token: "other value" },
      })
    ).toEqual(
      fromJS({
        token: "other value",
        isAuthenticated: true,
        isLoading: false,
      })
    );
    expect(
      reducer(initialStateWithToken, {
        type: types.LOGIN_SUCCESS,
        payload: { token: "another value" },
      })
    ).toEqual(
      fromJS({
        isAuthenticated: true,
        isLoading: false,
        token: "another value",
        user: null,
        isLoading: false,
      })
    );
  });

  it("should handle LOGIN_FAIL", () => {
    expect(
      reducer(fromJS({}), {
        type: types.LOGIN_FAIL,
      })
    ).toEqual(initialState);

    expect(
      reducer(initialStateWithToken, {
        type: types.LOGIN_FAIL,
      })
    ).toEqual(initialState);
  });
});
