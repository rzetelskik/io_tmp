import React from "react";
import { connect } from "react-redux";
import Chat from "./components/Chat";
import { selectUser, selectMatchClient } from "../../reducer";
import { selectCurrentMatch } from "../matcher/main-matcher/reducer";

const ChatContainer = (props) => {
  return (
    <Chat
      chatMessages={props.chatMessages}
      matchId={props.matchId}
      matchClient={props.matchClient}
      myUsername={props.myUsername}
      theirFirstName={props.theirFirstName}
    />
  );
};

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat").toJS(),
  matchId: selectCurrentMatch(state).get("match_id"),
  matchClient: selectMatchClient(state),
  myUsername: selectUser(state).get("username"),
  theirFirstName: selectCurrentMatch(state).get("first_name"),
});

export default connect(mapStateToProps)(ChatContainer);
