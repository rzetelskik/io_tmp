import { GET_ERRORS } from "../actions/types";

const initialState = {
  msg: {},
  status: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: "error",
        status: "status"
      };
    default:
      return state;
  }
}
