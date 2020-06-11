import React from "react";
import { connect } from "react-redux";
import PreviousChat from "./PreviousChat";

function PreviousChatContainer(props) {
  return (
    <PreviousChat
      chatMessages={props.chatMessages}
      matchClient={props.matchClient}
      myUsername={props.myUsername}
    />
  );
}

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat").toJS(),
  matchClient: state.getIn(["matcher", "matchClient"]),
  myUsername: state.getIn(["auth", "user", "username"]),
});

export default connect(mapStateToProps)(PreviousChatContainer);
