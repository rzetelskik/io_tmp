import React, { useState, useEffect, Fragment } from "react";
import MessageList from "./MessageList";

const Chat = (props) => {
  const [messages, setMessages] = useState(null);

  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (!messages && props.matchClient) {
      props.matchClient.fetchMessages(props.matchId);
    }
    if (props.matchClient && messages !== props.chatMessages) {
      setMessages(props.chatMessages);
    }
  }, [messages, props.matchClient, props.chatMessages, props.matchId]);

  const messageList = props.chatMessages[props.matchId]
    ? props.chatMessages[props.matchId.toString()]
    : [];

  const onSubmit = (text) => (e) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    props.matchClient.newChatMessage({
      match_id: props.matchId,
      text: text,
    });
    setInput("");
  };

  const inputForm = (
    <Fragment>
      <div className="card-body bg-light text-dark">
        <form onSubmit={onSubmit(input)} className="send-message-form">
          <input
            className="form-control"
            onChange={onChange}
            value={input}
            placeholder="Type your message "
            type="text"
          />
        </form>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <li>
        <MessageList
          messageList={messageList}
          myUsername={props.myUsername}
          theirFirstName={props.firstName}
        />
      </li>
      <li>{inputForm}</li>
    </Fragment>
  );
};

export default Chat;