import { GET_LOCATION } from "../actions/types";

const initialState = {
  coords: {},
  timestamp: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION:
      return {
        coords: action.payload.coords,
        timestamp: action.payload.timestamp
      };
    default:
      return state;
  }
}
