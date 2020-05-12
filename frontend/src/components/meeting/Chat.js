import React, { useEffect, Fragment } from "react";
import MessageList from "./MessageList";
import { connect } from "react-redux";

function Chat(props) {
  useEffect(() => {
    console.log(props.chatMessages.toString());
  });

  // const matchId = props.getIn(["currentMatch", "match_id"]).toString();
  // const messageList = props.getIn(["chat", matchId]);

  const matchId = props.currentMatch.match_id.toString();
  const messageList = props.getIn(["chat", matchId]);
  console.log("dupa: " + messageList.toString());

  return (
    <Fragment>
      <div className="chat"></div>;
      <MessageList messageList={messageList} />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat"),
});

export default connect(mapStateToProps)(Chat);
