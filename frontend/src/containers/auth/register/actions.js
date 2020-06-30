import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_TAGS_SUCCESS,
} from "./const";

export const userLoaded = (data) => {
  return {
    type: USER_LOADED,
    payload: data,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
};

export const updateDetailsSuccess = (data) => {
  return {
    type: UPDATE_DETAILS_SUCCESS,
    payload: data,
  };
};

export const updateTagsSuccess = (data) => {
  return {
    type: UPDATE_TAGS_SUCCESS,
    payload: data,
  };
};

export const authError = () => {
  return {
    type: AUTH_ERROR,
  };
};

export const loginFail = () => {
  return {
    type: LOGIN_FAIL,
  };
};

export const registerFail = () => {
  return {
    type: REGISTER_FAIL,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const userLoading = () => {
  return {
    type: USER_LOADING,
  };
};
