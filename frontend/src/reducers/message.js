import { CREATE_MESSAGE } from "../actions/types";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return fromJS(action.payload);
    default:
      return state;
  }
}
