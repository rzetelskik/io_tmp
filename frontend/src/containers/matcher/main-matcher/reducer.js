import {
  GET_USERS,
  NEXT_USER,
  NEW_MATCH,
  CLEAR_MATCH,
  MATCH_CLIENT,
  PREVIOUS_MATCHES,
} from "./const";
import { LOGOUT_SUCCESS } from "../../auth/register/const";
import { fromJS } from "immutable";

const initialState = fromJS({
  matchClient: null,
  users: [],
  userCount: 0,
  currentMatch: null,
  previousMatches: null,
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
    case PREVIOUS_MATCHES:
      return state.merge(
        fromJS({
          previousMatches: action.payload,
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

// SELECTORS
export const selectMatchClient = (state) => state.get("matchClient");

export const selectUsers = (state) => state.get("users");

export const selectUserCount = (state) => state.get("userCount");

export const selectCurrentMatch = (state) => state.get("currentMatch");

export const selectPreviousMatches = (state) => state.get("previousMatches");
