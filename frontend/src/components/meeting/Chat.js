import React, { useEffect, Fragment } from "react";
import MessageList from "./MessageList";
import { connect } from "react-redux";

function Chat(props) {
  useEffect(() => {
    console.log(props.chatMessages.toString());
  });

  // const matchId = props.currentMatch;
  // const messageList = props.chatMessages;
  // console.log("dupa: " + messageList.toString());
  const messageList = ["kupsko", "dupsko", "twoja stara"];

  return (
    <Fragment>
      <div className="chat"></div>;
      <MessageList messageList={messageList} />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat"),
  currentMatch: state.getIn(["matcher", "currentMatch", "match_id"]),
});

export default connect(mapStateToProps)(Chat);
