import {
  actionSetMessages,
  actionLastMessage,
  actionNewMessage,
} from "../action-creators/chat";

export const setMessages = (matchId, messages) => (dispatch) => {
  // console.log("lista wiadomosci");
  const m = {
    matchId: matchId,
    messages: messages,
  };
  return dispatch(actionSetMessages(m));
};

export const newMessage = (message, messageId) => (dispatch, getState) => {
  // console.log("nowa wiadomosc", message.match_id, message.content);

  const lastMessageId = getState().getIn(["chat", "lastMessageId"]);
  // console.log(lastMessageId, " ", messageId);

  if (lastMessageId && messageId <= lastMessageId) {
    return;
  }

  dispatch(actionLastMessage(messageId));

  dispatch(actionNewMessage(message));
};
