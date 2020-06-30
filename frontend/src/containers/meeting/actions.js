import { CREATE_MESSAGE } from "../main-panel/const";

export const MESSAGE_INFO = "MESSAGE_INFO";
export const MESSAGE_SUCCESS = "MESSAGE_SUCCESS";
export const MESSAGE_ERROR = "MESSAGE_ERROR";

export const createMessage = (messageType, msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: { msg, messageType },
  };
};
