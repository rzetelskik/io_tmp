import { GET_LOCATION } from "./types";

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
      alert("dupa jakaś");
    }
  );
};
