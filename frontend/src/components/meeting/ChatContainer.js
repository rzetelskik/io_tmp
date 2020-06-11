import React from "react";
import { connect } from "react-redux";
import Chat from "./Chat";

export function ChatContainer(props) {
  return (
    <Chat
      chatMessages={props.chatMessages}
      matchId={props.matchId}
      matchClient={props.matchClient}
      myUsername={props.myUsername}
      theirFirstName={props.theirFirstName}
    />
  );
}

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat").toJS(),
  matchId: state.getIn(["matcher", "currentMatch", "match_id"]),
  matchClient: state.getIn(["matcher", "matchClient"]),
  myUsername: state.getIn(["auth", "user", "username"]),
  theirFirstName: state.getIn(["matcher", "currentMatch", "first_name"]),
});

export default connect(mapStateToProps)(ChatContainer);
