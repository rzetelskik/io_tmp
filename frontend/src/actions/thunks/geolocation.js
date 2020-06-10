import {
  createMessage,
  MESSAGE_INFO,
  MESSAGE_ERROR,
} from "../action-creators/messages";
import { tokenConfig } from "./auth";
import axios from "axios";
import {
  getLocationSuccess,
  getLocationFail,
  sendLocationSuccess,
  getLocationLoading,
} from "../action-creators/geolocation";

export const getGeolocation = () => (dispatch) => {
  dispatch(getLocationLoading());
  const geolocation = navigator.geolocation;
  if (!geolocation) {
    dispatch(
      createMessage(MESSAGE_ERROR, "Your browser does not support geolocation")
    );
  }

  geolocation.getCurrentPosition(
    (position) => {
      dispatch(getLocationSuccess(position));
    },
    () => {
      dispatch(createMessage(MESSAGE_INFO, "Your location cannot be found"));
      dispatch(getLocationFail());
    }
  );
};

export const sendLocation = (location) => (dispatch, getState) => {
  const body = JSON.stringify(location);

  axios
    .put("/api/account/user-location/", body, tokenConfig(getState))
    .then((res) => {
      dispatch(sendLocationSuccess());
    })
    .catch((err) => {
      dispatch(
        createMessage(MESSAGE_ERROR, "Error when connecting to the server")
      );
    });
};
