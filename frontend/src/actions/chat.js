import { SET_MESSAGES, NEW_MESSAGE } from "./types";

export const setMessages = (matchId, messages) => (dispatch) => {
  // console.log("lista wiadomosci");

  dispatch({
    type: SET_MESSAGES,
    payload: {
      matchId: matchId,
      messages: messages,
    },
  });
};

export const newMessage = (message) => (dispatch) => {
  // console.log("nowa wiadomosc", message.match_id, message.content);

  dispatch({
    type: NEW_MESSAGE,
    payload: message,
  });
};
