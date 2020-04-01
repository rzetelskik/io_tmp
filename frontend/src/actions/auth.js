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
  PASSWORD_CHANGE_SUCCESS,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_FAIL
} from "./types";
import { createMessage, MESSAGE_SUCCESS, MESSAGE_INFO } from "./messages";
import { createError } from "./errors";

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
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch(createError(errors));
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
      dispatch(createMessage(MESSAGE_SUCCESS, "User successfully registered"));
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch(createError(errors));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const updateDetails = (first_name, last_name, location_range) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ first_name, last_name, location_range });

  axios
    .put("/api/account/details-update/", body, tokenConfig(getState))
    .then(res => {
      dispatch(
        createMessage(MESSAGE_SUCCESS, "Account details updated successfully.")
      );
      dispatch({
        type: UPDATE_DETAILS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch(createError(errors));
      dispatch({
        type: UPDATE_DETAILS_FAIL
      });
    });
};

export const changePassword = (password, new_password, new_password_repeat) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ password, new_password, new_password_repeat });

  axios
    .put("/api/account/password-update/", body, tokenConfig(getState))
    .then(res => {
      dispatch(
        createMessage(MESSAGE_SUCCESS, "Password changed successfully.")
      );
      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch(createError(errors));
      dispatch({
        type: PASSWORD_CHANGE_FAIL
      });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/account/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage(MESSAGE_INFO, "Logged out."));
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch(createError(errors));
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
