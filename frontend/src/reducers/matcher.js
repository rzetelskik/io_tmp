import {
  GET_USERS,
  NEXT_USER,
  LOGOUT_SUCCESS,
  NEW_MATCH,
  CLEAR_MATCH,
  MATCH_CLIENT,
} from "../actions/types";
import { fromJS } from "immutable";

const initialState = fromJS({
  matchClient: null,
  users: [],
  userCount: 0,
  currentMatch: null,
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
    case NEW_MATCH:
      return state.merge(
        fromJS({
          users: [],
          userCount: 0,
          currentMatch: action.payload,
        })
      );
    case CLEAR_MATCH:
      return state.merge(
        fromJS({
          currentMatch: null,
        })
      );
    case MATCH_CLIENT:
      return state.merge(
        fromJS({
          matchClient: action.payload,
        })
      );
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
