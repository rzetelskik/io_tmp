import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Autorization"] = `Token ${token}`;
  }

  axios
    .get("/api/account/user", config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("ERROR");
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const login = (username, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ username, password });

  axios
    .post("/api/account/login/", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("ERROR");
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
