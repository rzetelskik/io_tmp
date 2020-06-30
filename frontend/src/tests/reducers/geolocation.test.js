import reducer from "../../containers/matcher/helper-matcher/reducer";
import * as types from "../../actions/types";
import { fromJS } from "immutable";

describe("geolocation reducer", () => {
  const initialState = fromJS({
    accepted: false,
    isLoading: true,
    coords: {},
    timestamp: -1,
    locationSent: false,
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_LOCATION_SUCCESS", () => {
    expect(
      reducer(fromJS({}), {
        type: types.GET_LOCATION_SUCCESS,
        payload: {
          coords: "coords",
          timestamp: "timestamp",
        },
      })
    ).toEqual(
      fromJS({
        coords: "coords",
        timestamp: "timestamp",
        isLoading: false,
        accepted: true,
      })
    );

    expect(
      reducer(initialState, {
        type: types.GET_LOCATION_SUCCESS,
        payload: {
          coords: "coords",
          timestamp: "timestamp",
        },
      })
    ).toEqual(
      fromJS({
        coords: "coords",
        timestamp: "timestamp",
        isLoading: false,
        accepted: true,
        locationSent: false,
      })
    );
  });

  it("should handle GET_LOCATION_LOADING", () => {
    expect(
      reducer(fromJS({}), {
        type: types.GET_LOCATION_LOADING,
      })
    ).toEqual(
      fromJS({
        isLoading: true,
      })
    );

    expect(
      reducer(initialState, {
        type: types.GET_LOCATION_LOADING,
      })
    ).toEqual(
      fromJS({
        isLoading: true,
        accepted: false,
        coords: {},
        timestamp: -1,
        locationSent: false,
      })
    );
  });

  it("should handle GET_LOCATION_FAILED", () => {
    expect(
      reducer(fromJS({}), {
        type: types.GET_LOCATION_FAILED,
      })
    ).toEqual(
      fromJS({
        accepted: false,
        isLoading: false,
      })
    );

    expect(
      reducer(initialState, {
        type: types.GET_LOCATION_FAILED,
      })
    ).toEqual(
      fromJS({
        coords: {},
        timestamp: -1,
        locationSent: false,
        accepted: false,
        isLoading: false,
      })
    );
  });

  it("should handle SEND_LOCATION_SUCCESS", () => {
    expect(
      reducer(fromJS({}), {
        type: types.SEND_LOCATION_SUCCESS,
      })
    ).toEqual(
      fromJS({
        locationSent: true,
      })
    );

    expect(
      reducer(initialState, {
        type: types.SEND_LOCATION_SUCCESS,
      })
    ).toEqual(
      fromJS({
        locationSent: true,
        accepted: false,
        isLoading: true,
        coords: {},
        timestamp: -1,
      })
    );
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      reducer(fromJS({}), {
        type: types.LOGOUT_SUCCESS,
      })
    ).toEqual(initialState);

    expect(
      reducer(initialState, {
        type: types.LOGOUT_SUCCESS,
      })
    ).toEqual(initialState);
  });
});
