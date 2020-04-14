import { GET_USERS, NEXT_USER, LOGOUT_SUCCESS } from "../actions/types";
import { fromJS } from "immutable";

const initialState = fromJS({
  users: [],
  userCount: 0,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return state.merge(
        fromJS({
          users: state.get("users").concat(fromJS(action.payload)),
          userCount: state.get("userCount") + action.payload.length,
        })
      );
    case NEXT_USER:
      return state.merge(
        fromJS({
          users: state.get("users").slice(1, state.get("users").length),
          userCount: state.get("userCount") - 1,
        })
      );
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
