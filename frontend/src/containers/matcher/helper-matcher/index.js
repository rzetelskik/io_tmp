import React from "react";
import { sendLocation } from "../../../thunks/geolocation";
import { getUserOffers, matcherAnswer } from "../../../thunks/matcher";
import { connect } from "react-redux";
import ActualMatcher from "./components";
import {
  selectTimestamp,
  selectCoords,
  selectLocationSent,
  selectUsers,
  selectUserCount,
} from "../../../reducer";

const Index = (props) => {
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
};

const mapStateToProps = (state) => ({
  coords: selectCoords(state),
  locationSent: selectLocationSent(state),
  timestamp: selectTimestamp(state),
  users: selectUsers(state),
  userCount: selectUserCount(state),
});

export default connect(mapStateToProps, {
  getUserOffers,
  sendLocation,
  matcherAnswer,
})(Index);
