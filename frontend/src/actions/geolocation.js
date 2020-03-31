import { GET_LOCATION } from "./types";
import { createMessage, MESSAGE_INFO } from "./messages";

export const getGeolocation = () => dispatch => {
  const geolocation = navigator.geolocation;
  if (!geolocation) {
    alert("allow geolocation");
  }

  geolocation.getCurrentPosition(
    position => {
      dispatch({
        type: GET_LOCATION,
        payload: position
      });
    },
    () => {
      dispatch(createMessage(MESSAGE_INFO, "Your location cannot be found"));
    }
  );
};
