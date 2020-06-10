import {
  GET_LOCATION_SUCCESS,
  GET_LOCATION_LOADING,
  GET_LOCATION_FAILED,
  SEND_LOCATION_SUCCESS,
} from "../types";

export const getLocationSuccess = (data) => {
  return {
    type: GET_LOCATION_SUCCESS,
    payload: data,
  };
};

export const getLocationFail = () => {
  return {
    type: GET_LOCATION_FAILED,
  };
};

export const sendLocationSuccess = () => {
  return {
    type: SEND_LOCATION_SUCCESS,
  };
};

export const getLocationLoading = () => {
  return {
    type: GET_LOCATION_LOADING,
  };
};
