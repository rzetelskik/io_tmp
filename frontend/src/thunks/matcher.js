import { createMessage, MESSAGE_ERROR } from "../containers/meeting/actions";
import { tokenConfig } from "./auth";
import axios from "axios";
import {
  actionGetUsers,
  actionNextUser,
  actionNewMatch,
  actionClearMatch,
  actionPreviousMatches,
  actionMatchClient,
} from "../containers/matcher/main-matcher/actions";

export const getUserOffers = () => (dispatch, getState) => {
  axios
    .get("/api/account/list-matching-users/", tokenConfig(getState))
    .then((res) => {
      dispatch(actionGetUsers(res.data));
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
      dispatch(nextUser());
    })
    .catch((err) => {
      dispatch(
        createMessage(MESSAGE_ERROR, "Error when connecting to the server")
      );
    });
};

export const nextUser = () => (dispatch) => {
  dispatch(actionNextUser());
};

export const askForMatch = () => (dispatch, getState) => {
  axios
    .get("api/matcher/current-match/", tokenConfig(getState))
    .then((res) => {
      if (res.data.first_name) {
        dispatch(actionNewMatch(res.data));
      } else {
        dispatch(actionClearMatch());
      }
    })
    .catch((err) => {
      dispatch(
        createMessage(MESSAGE_ERROR, "Error when connecting to the server")
      );
    });
};

export const previousMatches = () => (dispatch, getState) => {
  axios
    .get("api/matcher/terminated-matches/", tokenConfig(getState))
    .then((res) => {
      dispatch(actionPreviousMatches(res.data));
    })
    .catch((err) => {
      dispatch(
        createMessage(MESSAGE_ERROR, "Error when connecting to the server")
      );
    });
};

export const endMeeting = () => (dispatch, getState) => {
  axios
    .post("api/matcher/terminate-current-match/", null, tokenConfig(getState))
    .then((res) => {
      dispatch(actionClearMatch());
    })
    .catch((err) => {
      dispatch(
        createMessage(MESSAGE_ERROR, "Error when connecting to the server")
      );
    });
};

export const saveMatchClient = (MatchClient) => (dispatch) => {
  dispatch(actionMatchClient(MatchClient));
};
