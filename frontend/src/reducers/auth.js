import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  username: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        username: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        tokon: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
