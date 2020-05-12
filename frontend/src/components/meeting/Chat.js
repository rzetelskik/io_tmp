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

  const click = (text) => () => {
    props.matchClient.newChatMessage({
      match_id: props.matchId,
      text: text,
    });
  };

  const inputForm = (
    <Fragment>
      <div className="card-body bg-light text-dark">
        <div className="input-group mb-3">
          <input
            type="text"
            onChange={onChange}
            value={input}
            className="form-control"
            placeholder="Type your message"
            aria-label="Type your message"
            aria-describedby="button-addon2"
          />
          <div className="input-group-append">
            <button
              onClick={click(input)}
              className="btn btn-outline-primary"
              type="button"
              id="button-addon2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <li>
        <div className="card-body bg-light text-dark">
          <MessageList
            messageList={messageList}
            myFirstName={props.myFirstName}
            myUsername={props.myUsername}
            theirFirstName={props.theirFirstName}
          />
        </div>
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
