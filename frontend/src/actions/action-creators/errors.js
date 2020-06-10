import { CREATE_ERROR } from "../types";

export const createError = (msg) => {
  return {
    type: CREATE_ERROR,
    payload: msg,
  };
};
