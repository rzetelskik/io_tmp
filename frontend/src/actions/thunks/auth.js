import axios from "axios";
import {
  createMessage,
  MESSAGE_SUCCESS,
  MESSAGE_INFO,
} from "../action-creators/messages";
import { createError } from "../action-creators/errors";
import WebSocketClient from "../../services/MatchClient";
import {
  userLoaded,
  authError,
  loginSuccess,
  loginFail,
  registerSuccess,
  registerFail,
  updateDetailsSuccess,
  updateTagsSuccess,
  logoutSuccess,
  userLoading,
} from "../action-creators/auth";

export const loadUser = () => (dispatch, getState) => {
  dispatch(userLoading());

  return axios
    .get("/api/account/user", tokenConfig(getState))
    .then((res) => {
      return dispatch(userLoaded(res.data));
    })
    .catch((err) => {
      dispatch(authError());
    });
};

export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  return axios
    .post("/api/account/login/", body, config)
    .then((res) => {
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch(createError(errors));
      dispatch(loginFail());
    });
};

export const register = (user) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);

  return axios
    .post("/api/account/register/", body, config)
    .then((res) => {
      dispatch(createMessage(MESSAGE_SUCCESS, "User successfully registered"));
      dispatch(registerSuccess(res.data));
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch(createError(errors));
      dispatch(registerFail());
    });
};

export const updateDetails = (first_name, last_name, location_range) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ first_name, last_name, location_range });

  return axios
    .put("/api/account/details-update/", body, tokenConfig(getState))
    .then((res) => {
      dispatch(
        createMessage(MESSAGE_SUCCESS, "Account details updated successfully.")
      );
      dispatch(updateDetailsSuccess({ first_name, last_name, location_range }));
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch(createError(errors));
    });
};

export const updateTags = (tags) => (dispatch, getState) => {
  const body = JSON.stringify({ tags: tags });

  axios
    .put("/api/account/tags-update/", body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage(MESSAGE_SUCCESS, "Tags updated!"));
      dispatch(updateTagsSuccess(tags));
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch(createError(errors));
    });
};

export const changePassword = (password, new_password, new_password_repeat) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ password, new_password, new_password_repeat });

  return axios
    .put("/api/account/password-update/", body, tokenConfig(getState))
    .then((res) => {
      dispatch(
        createMessage(MESSAGE_SUCCESS, "Password changed successfully.")
      );
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch(createError(errors));
    });
};

export const logout = () => (dispatch, getState) => {
  return axios
    .post("/api/account/logout/", null, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage(MESSAGE_INFO, "Logged out."));
      WebSocketClient.closeConnection();
      dispatch(logoutSuccess());
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch(createError(errors));
    });
};

// SETUP CONFIG WITH TOKEN - HELPER
export const tokenConfig = (getState) => {
  const token = getState().getIn(["auth", "token"], null);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
