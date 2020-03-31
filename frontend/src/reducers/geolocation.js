import {
  GET_LOCATION_LOADING,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_ACCEPT,
  GET_LOCATION_FAILED
} from "../actions/types";

const initialState = {
  accepted: localStorage.getItem("locationAccepted"),
  isLoading: false,
  coords: {},
  timestamp: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION_SUCCESS:
      return {
        coords: action.payload.coords,
        timestamp: action.payload.timestamp,
        isLoading: false,
        accepted: "true"
      };
    case GET_LOCATION_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_LOCATION_ACCEPT:
      localStorage.setItem("locationAccepted", true);
      return {
        ...state,
        accepted: "true",
        isLoading: true
      };
    case GET_LOCATION_FAILED:
      localStorage.removeItem("locationAccepted");
      return {
        ...state,
        accepted: "false",
        isLoading: true
      };
    default:
      return state;
  }
}
