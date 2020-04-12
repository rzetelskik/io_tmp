import { CREATE_ERROR } from "../actions/types";
import { fromJS } from "immutable";

const initialState = fromJS({
  msg: {},
  status: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ERROR:
      return state.merge(
        fromJS({
          msg: action.payload.msg,
          status: action.payload.status,
        })
      );
    default:
      return state;
  }
}
