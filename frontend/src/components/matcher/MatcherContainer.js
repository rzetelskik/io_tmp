import React from "react";
import { connect } from "react-redux";
import { getGeolocation } from "../../actions/thunks/geolocation";
import { createMessage } from "../../actions/action-creators/messages";
import { endMeeting } from "../../actions/thunks/matcher";
import Matcher from "./Matcher";

export function MatcherContainer(props) {
  return (
    <Matcher
      coords={props.coords}
      timestamp={props.timestamp}
      isLoading={props.isLoading}
      accepted={props.accepted}
      currentMatch={props.currentMatch}
      getGeolocation={props.getGeolocation}
      createMessage={props.createMessage}
      endMeeting={props.endMeeting}
    />
  );
}

const mapStateToProps = (state) => ({
  coords: state.getIn(["geolocation", "coords"]),
  timestamp: state.getIn(["geolocation", "timestamp"]),
  isLoading: state.getIn(["geolocation", "isLoading"]),
  accepted: state.getIn(["geolocation", "accepted"]),
  currentMatch: state.getIn(["matcher", "currentMatch"]),
});

export default connect(mapStateToProps, {
  getGeolocation,
  createMessage,
  endMeeting,
})(MatcherContainer);
