import { SET_MESSAGES, NEW_MESSAGE, LAST_MESSAGE_ID } from "./const";

export const actionSetMessages = (data) => {
  return {
    type: SET_MESSAGES,
    payload: data,
  };
};

export const actionNewMessage = (data) => {
  return {
    type: NEW_MESSAGE,
    payload: data,
  };
};

export const actionLastMessage = (data) => {
  return {
    type: LAST_MESSAGE_ID,
    payload: data,
  };
};
