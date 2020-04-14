import { createMessage, MESSAGE_ERROR } from "./messages";
import { tokenConfig } from "./auth";
import axios from "axios";
import { GET_USERS, NEXT_USER } from "./types";

export const getUserOffers = () => (dispatch, getState) => {
  axios
    .get("/api/account/list-matching-users/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        createMessage(MESSAGE_ERROR, "Error when connecting to the server")
      );
    });
};

export const matcherAnswer = (agreed, recipient) => (dispatch, getState) => {
  const body = JSON.stringify({ agreed, recipient });

  axios
    .post("api/matcher/answer/", body, tokenConfig(getState))
    .then((res) => {
      console.log("OK");
      dispatch(nextUser());
    })
    .catch((err) => {
      console.log("matcher answer error");
      dispatch(
        createMessage(MESSAGE_ERROR, "Error when connecting to the server")
      );
    });
};

export const nextUser = () => (dispatch) => {
  dispatch({
    type: NEXT_USER,
  });
};
