import {
  GET_LOCATION_LOADING,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_ACCEPT,
  GET_LOCATION_FAILED,
  SEND_LOCATION_SUCCESS
} from "../actions/types";

const initialState = {
  accepted: localStorage.getItem("locationAccepted"),
  isLoading: true,
  coords: {},
  timestamp: 0,
  locationSent: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
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
    case SEND_LOCATION_SUCCESS:
      return {
        ...state,
        locationSent: true
      };
    default:
      return state;
  }
}
