import React from "react";
import { connect } from "react-redux";
import PreviousChat from "./components";
import { selectUser, selectMatchClient } from "../../../reducer";

const PreviousChatContainer = (props) => {
  return (
    <PreviousChat
      chatMessages={props.chatMessages}
      matchClient={props.matchClient}
      myUsername={props.myUsername}
    />
  );
};

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat").toJS(),
  matchClient: selectMatchClient(state),
  myUsername: selectUser(state).get("username"),
});

export default connect(mapStateToProps)(PreviousChatContainer);
