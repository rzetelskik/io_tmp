import React, { useState, useEffect, Fragment } from "react";
import MessageList from "./MessageList";
import { connect } from "react-redux";

function Chat(props) {
  const [messages, setMessages] = useState(null);

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

  const click = () => {
    props.matchClient.newChatMessage({
      match_id: props.matchId,
      text: "kiminotede kirisate kyo ko i wo kyo ku wo",
    });
  };

  return (
    <Fragment>
      <button onClick={click}></button>
      <MessageList messageList={messageList} />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat").toJS(),
  matchId: state.getIn(["matcher", "currentMatch", "match_id"]),
  matchClient: state.getIn(["matcher", "matchClient"]),
});

export default connect(mapStateToProps)(Chat);
