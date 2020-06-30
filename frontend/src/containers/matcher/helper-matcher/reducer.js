import {
  GET_LOCATION_LOADING,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILED,
  SEND_LOCATION_SUCCESS,
} from "./const";
import {
  LOGOUT_SUCCESS,
} from "../../auth/register/const";
import { fromJS } from "immutable";
import * as fromErrors from "../../main-panel/reducer";

const initialState = fromJS({
  accepted: false,
  isLoading: true,
  coords: {},
  timestamp: -1,
  locationSent: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION_SUCCESS:
      return state.merge(
        fromJS({
          coords: action.payload.coords,
          timestamp: action.payload.timestamp,
          isLoading: false,
          accepted: true,
        })
      );
    case GET_LOCATION_LOADING:
      return state.merge(
        fromJS({
          isLoading: true,
        })
      );
    case GET_LOCATION_FAILED:
      localStorage.removeItem("locationAccepted");
      return state.merge(
        fromJS({
          accepted: false,
          isLoading: false,
        })
      );
    case SEND_LOCATION_SUCCESS:
      return state.merge(
        fromJS({
          locationSent: true,
        })
      );
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

// SELECTORS
export const selectAccepted = state => (
    state.get("accepted")
);

export const selectMatcherIsLoading = state => (
    state.get("isLoading")
);

export const selectCoords = state => (
    state.get("coords")
);

export const selectTimestamp = state => (
    state.get("timestamp")
);

export const selectLocationSent = state => (
    state.get("locationSent")
);
