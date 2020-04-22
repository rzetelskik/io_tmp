import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../actions/types";
import { fromJS } from "immutable";

const initialState = fromJS({
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return state.merge(
        fromJS({
          isLoading: true,
        })
      );
    case USER_LOADED:
      return state.merge(
        fromJS({
          user: action.payload,
          isLoading: false,
          isAuthenticated: true,
        })
      );
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return state.merge(
        fromJS(action.payload),
        fromJS({
          isAuthenticated: true,
          isLoading: false,
        })
      );
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return initialState.merge(fromJS({ isLoading: false }));
    default:
      return state;
  }
}
