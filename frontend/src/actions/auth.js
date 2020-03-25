import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_CHANGE_FAIL,
  PASSWORD_CHANGE_SUCCESS
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/account/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
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

export const register = user => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(user);

  axios
    .post("/api/account/register/", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("ERROR");
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const changePassword = (password1, password2, password3) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ password1, password2, password3 });

  axios
    .put("/api/account/password-update/", body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PASSWORD_CHANGE_FAIL
      });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/account/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      console.log("LOGOUT ERROR");
    });
};

// SETUP CONFIG WITH TOKEN - HELPER
export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
