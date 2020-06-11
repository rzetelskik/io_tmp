import React from "react";
import { sendLocation } from "../../actions/thunks/geolocation";
import { getUserOffers, matcherAnswer } from "../../actions/thunks/matcher";
import { connect } from "react-redux";
import ActualMatcher from "./ActualMatcher";

export function ActualMatcherContainer(props) {
  return (
    <ActualMatcher
      coords={props.coords}
      locationSent={props.locationSent}
      timestamp={props.timestamp}
      users={props.users}
      userCount={props.userCount}
      getUserOffers={props.getUserOffers}
      sendLocation={props.sendLocation}
      matcherAnswer={props.matcherAnswer}
    />
  );
}

const mapStateToProps = (state) => ({
  coords: state.getIn(["geolocation", "coords"]),
  locationSent: state.getIn(["geolocation", "locationSent"]),
  timestamp: state.getIn(["geolocation", "timestamp"]),
  users: state.getIn(["matcher", "users"]),
  userCount: state.getIn(["matcher", "userCount"]),
});

export default connect(mapStateToProps, {
  getUserOffers,
  sendLocation,
  matcherAnswer,
})(ActualMatcherContainer);
