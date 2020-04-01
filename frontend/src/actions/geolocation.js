import {
  GET_LOCATION_SUCCESS,
  GET_LOCATION_LOADING,
  GET_LOCATION_ACCEPT,
  GET_LOCATION_FAILED,
  SEND_LOCATION_SUCCESS
} from "./types";
import { createMessage, MESSAGE_INFO, MESSAGE_ERROR } from "./messages";
import { tokenConfig } from "./auth";
import axios from "axios";

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

export const sendLocation = location => (dispatch, getState) => {
  const body = JSON.stringify(location);

  axios
    .put("/api/account/user-location/", body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: SEND_LOCATION_SUCCESS });
    })
    .catch(err => {
      dispatch(
        createMessage(MESSAGE_ERROR, "Error when connecting to the server")
      );
    });
};
