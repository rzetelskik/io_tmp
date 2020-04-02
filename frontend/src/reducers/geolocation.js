import {
  GET_LOCATION_LOADING,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILED,
  SEND_LOCATION_SUCCESS,
  LOGOUT_SUCCESS
} from "../actions/types";

const initialState = {
  accepted: false,
  isLoading: true,
  coords: {},
  timestamp: -1,
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
        accepted: true
      };
    case GET_LOCATION_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_LOCATION_FAILED:
      localStorage.removeItem("locationAccepted");
      return {
        ...state,
        accepted: false,
        isLoading: false
      };
    case SEND_LOCATION_SUCCESS:
      return {
        ...state,
        locationSent: true
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
