import React from "react";
import { askForMatch, endMeeting, saveMatchClient } from "../../thunks/matcher";
import { connect } from "react-redux";
import { createMessage } from "../meeting/actions";
import { newMessage, setMessages } from "../../thunks/chat";
import MainPanel from "./components";
import { selectCurrentMatch } from "../../reducer";

const MainPanelContainer = (props) => {
  return (
    <MainPanel
      currentMatch={props.currentMatch}
      askForMatch={props.askForMatch}
      endMeeting={props.endMeeting}
      saveMatchClient={props.saveMatchClient}
      createMessage={props.createMessage}
      setMessages={props.setMessages}
      newMessage={props.newMessage}
    />
  );
};

const mapStateToProps = (state) => ({
  currentMatch: selectCurrentMatch(state),
});

export default connect(mapStateToProps, {
  askForMatch,
  endMeeting,
  saveMatchClient,
  createMessage,
  setMessages,
  newMessage,
})(MainPanelContainer);
