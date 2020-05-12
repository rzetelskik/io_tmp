import { NEW_MESSAGE, SET_MESSAGES } from "../actions/types";
import { fromJS } from "immutable";

const initialState = fromJS({});

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return state.merge(
        fromJS({
          [action.payload.matchId]: action.payload.messages,
        })
      );
    case NEW_MESSAGE:
      return state.has(action.payload.match_id.toString())
        ? state.merge(
            fromJS({
              [action.payload.match_id]: state
                .get(`${action.payload.match_id}`)
                .push(action.payload),
            })
          )
        : state.merge(
            fromJS({
              [action.payload.match_id]: [action.payload],
            })
          );
    default:
      return state;
  }
}
