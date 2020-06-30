import {
  GET_USERS,
  NEXT_USER,
  NEW_MATCH,
  CLEAR_MATCH,
  MATCH_CLIENT,
  PREVIOUS_MATCHES,
} from "./const";

export const actionGetUsers = (data) => {
  return {
    type: GET_USERS,
    payload: data,
  };
};

export const actionNewMatch = (data) => {
  return {
    type: NEW_MATCH,
    payload: data,
  };
};

export const actionPreviousMatches = (data) => {
  return {
    type: PREVIOUS_MATCHES,
    payload: data,
  };
};

export const actionMatchClient = (data) => {
  return {
    type: MATCH_CLIENT,
    payload: data,
  };
};

export const actionNextUser = () => {
  return {
    type: NEXT_USER,
  };
};

export const actionClearMatch = () => {
  return {
    type: CLEAR_MATCH,
  };
};
