import {
  GET_LOCATION_SUCCESS,
  GET_LOCATION_LOADING,
  GET_LOCATION_ACCEPT,
  GET_LOCATION_FAILED
} from "./types";
import { createMessage, MESSAGE_INFO, MESSAGE_ERROR } from "./messages";

export const acceptGeolocation = () => dispatch => {
  dispatch({
    type: GET_LOCATION_ACCEPT
  });
};

export const getGeolocation = () => dispatch => {
  dispatch({
    type: GET_LOCATION_LOADING
  });
  const geolocation = navigator.geolocation;
  if (!geolocation) {
    dispatch(
      createMessage(MESSAGE_ERROR, "Your browser does not support geolocation")
    );
  }

  geolocation.getCurrentPosition(
    position => {
      dispatch({
        type: GET_LOCATION_SUCCESS,
        payload: position
      });
    },
    () => {
      dispatch(createMessage(MESSAGE_INFO, "Your location cannot be found"));
      dispatch({
        type: GET_LOCATION_FAILED
      });
    }
  );
};
