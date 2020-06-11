import React from "react";
import {
  askForMatch,
  endMeeting,
  saveMatchClient,
} from "../../actions/thunks/matcher";
import { connect } from "react-redux";
import {
  createMessage,
} from "../../actions/action-creators/messages";
import { newMessage, setMessages } from "../../actions/thunks/chat";
import MainPanel from "./MainPanel";

function MainPanelContainer(props) {
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
}

const mapStateToProps = (state) => ({
  currentMatch: state.getIn(["matcher", "currentMatch"]),
});

export default connect(mapStateToProps, {
  askForMatch,
  endMeeting,
  saveMatchClient,
  createMessage,
  setMessages,
  newMessage,
})(MainPanelContainer);
