import reducer from "../../reducers/auth";
import * as types from "../../actions/types";

describe("auth reducer", () => {
  const initialState = {
    token: "token value",
    isAuthenticated: null,
    isLoading: false,
    user: null,
  };
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: localStorage.getItem("token"),
      isAuthenticated: null,
      isLoading: false,
      user: null,
    });
  });

  it("should handle USER_LOADING", () => {
    expect(
      reducer([], {
        type: types.USER_LOADING,
      })
    ).toEqual({
      isLoading: true,
    });

    expect(
      reducer(initialState, {
        type: types.USER_LOADING,
      })
    ).toEqual({
      token: "token value",
      isAuthenticated: null,
      user: null,
      isLoading: true,
    });
  });
  it("should handle USER_LOADED", () => {
    expect(
      reducer([], {
        type: types.USER_LOADED,
        payload: "some value",
      })
    ).toEqual({
      isLoading: false,
      isAuthenticated: true,
      user: "some value",
    });

    expect(
      reducer(initialState, {
        type: types.USER_LOADING,
        payload: "some value",
      })
    ).toEqual({
      token: "token value",
      isAuthenticated: null,
      user: null,
      isLoading: true,
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      reducer([], {
        type: types.LOGIN_SUCCESS,
        payload: 21337,
      })
    ).toEqual({
      isAuthenticated: true,
      isLoading: false,
    });

    expect(
      reducer(initialState, {
        type: types.LOGIN_SUCCESS,
        payload: 2137,
      })
    ).toEqual({
      isAuthenticated: true,
      isLoading: false,
      token: "token value",
      user: null,
      isLoading: false,
    });
  });

  it("should handle LOGIN_FAIL", () => {
    expect(
      reducer([], {
        type: types.LOGIN_FAIL,
      })
    ).toEqual({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    expect(
      reducer(initialState, {
        type: types.LOGIN_FAIL,
      })
    ).toEqual({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });
});
