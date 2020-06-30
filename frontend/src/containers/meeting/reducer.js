import { NEW_MESSAGE, SET_MESSAGES, LAST_MESSAGE_ID } from "../previous-meeting/previous-chat/const";
import { fromJS } from "immutable";

const initialState = fromJS({
  lastMessageId: -1,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return state.merge(
        fromJS({
          [action.payload.matchId]: action.payload.messages.reverse(),
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
    case LAST_MESSAGE_ID:
      return state.merge(
        fromJS({
          lastMessageId: action.payload,
        })
      );
    default:
      return state;
  }
}
