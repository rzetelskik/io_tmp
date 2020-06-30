import { CREATE_ERROR } from "./const";

export const createError = (msg) => {
  return {
    type: CREATE_ERROR,
    payload: msg,
  };
};
