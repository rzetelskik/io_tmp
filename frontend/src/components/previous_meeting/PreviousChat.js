import React, { useState, useEffect, Fragment } from "react";
import MessageList from "../meeting/MessageList";
import { connect } from "react-redux";

function PreviousChat(props) {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    console.log(props.matchId);

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

  const inputForm = (
    <Fragment>
      <div className="card-body bg-light text-dark">
        <form className="send-message-form">
          <input
            className="form-control"
            value={""}
            placeholder="You can't message here, this is just a history"
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
}

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat").toJS(),
  matchClient: state.getIn(["matcher", "matchClient"]),
  myUsername: state.getIn(["auth", "user", "username"]),
});

export default connect(mapStateToProps)(PreviousChat);
