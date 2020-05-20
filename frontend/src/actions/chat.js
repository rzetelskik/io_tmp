import { SET_MESSAGES, NEW_MESSAGE, LAST_MESSAGE_ID } from "./types";

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

export const newMessage = (message, messageId) => (dispatch, getState) => {
  // console.log("nowa wiadomosc", message.match_id, message.content);

  const lastMessageId = getState().getIn(["chat", "lastMessageId"]);
  // console.log(lastMessageId, " ", messageId);

  if (lastMessageId && messageId <= lastMessageId) {
    return;
  }

  dispatch({
    type: LAST_MESSAGE_ID,
    payload: messageId,
  });

  dispatch({
    type: NEW_MESSAGE,
    payload: message,
  });
};
