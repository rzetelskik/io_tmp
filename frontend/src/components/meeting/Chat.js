import React, { useState, useEffect, Fragment } from "react";
import MessageList from "./MessageList";
import { connect } from "react-redux";

function Chat(props) {
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
  console.log("wiadomosci ");
  messageList.forEach((message) => {
    console.log(message.author, message.content);
  });

  const onSubmit = (text) => (e) => {
    e.preventDefault();
    props.matchClient.newChatMessage({
      match_id: props.matchId,
      text: text,
    });
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
          myFirstName={props.myFirstName}
          myUsername={props.myUsername}
          theirFirstName={props.theirFirstName}
        />
      </li>
      <li>{inputForm}</li>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat").toJS(),
  matchId: state.getIn(["matcher", "currentMatch", "match_id"]),
  matchClient: state.getIn(["matcher", "matchClient"]),
  myFirstName: state.getIn(["auth", "user", "first_name"]),
  myUsername: state.getIn(["auth", "user", "username"]),
  theirFirstName: state.getIn(["matcher", "currentMatch", "first_name"]),
});

export default connect(mapStateToProps)(Chat);
