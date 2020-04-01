import { GET_USERS, NEXT_USER } from "../actions/types";

const initialState = {
  users: [],
  userCount: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: state.users.concat(action.payload),
        userCount: state.userCount + action.payload.length
      };
    case NEXT_USER:
      return {
        ...state,
        users: state.users.slice(1, state.users.length),
        userCount: state.userCount - 1
      };
    default:
      return state;
  }
}
