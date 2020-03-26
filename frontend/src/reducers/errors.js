import { CREATE_ERROR } from "../actions/types";

const initialState = {
  msg: {},
  status: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ERROR:
      return {
        msg: action.payload.msg,
        status: action.payload.status
      };
    default:
      return state;
  }
}
