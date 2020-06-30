import { CREATE_ERROR } from "./const";
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

// SELECTORS
export const selectMsg = (state) => state.get("msg");

export const selectStatus = (state) => state.get("status");
