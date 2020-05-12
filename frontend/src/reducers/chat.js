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
      //   return state.merge(
      //     fromJS({
      //       [action.payload.match_id]: state
      //         .get(`${action.payload.match_id}`, [])
      //         .push({
      //           author: action.payload.author,
      //           content: action.payload.content,
      //           timestamp: action.payload.timestamp,
      //         }),
      //     })
      //   );
      return state.has([action.payload.match_id])
        ? state.merge(
            fromJS({
              [action.payload.match_id]: state
                .get(`${action.payload.match_id}`)
                .push({
                  author: action.payload.author,
                  content: action.payload.content,
                  timestamp: action.payload.timestamp,
                }),
            })
          )
        : state.merge(
            fromJS({
              [action.payload.match_id]: [
                {
                  author: action.payload.author,
                  content: action.payload.content,
                  timestamp: action.payload.timestamp,
                },
              ],
            })
          );
    default:
      return state;
  }
}
