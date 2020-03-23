import { GET_LEADS } from "../actions/types.js";

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}
