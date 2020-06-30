import React from "react";
import { connect } from "react-redux";
import { getGeolocation } from "../../../thunks/geolocation";
import { createMessage } from "../../meeting/actions";
import { endMeeting } from "../../../thunks/matcher";
import Matcher from "./components";
import {
  selectIsLoading,
  selectTimestamp,
  selectAccepted,
  selectCoords,
  selectCurrentMatch,
} from "../../../reducer";

const MatcherContainer = (props) => {
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
};

const mapStateToProps = (state) => ({
  coords: selectCoords(state),
  timestamp: selectTimestamp(state),
  isLoading: selectIsLoading(state),
  accepted: selectAccepted(state),
  currentMatch: selectCurrentMatch(state),
});

export default connect(mapStateToProps, {
  getGeolocation,
  createMessage,
  endMeeting,
})(MatcherContainer);
