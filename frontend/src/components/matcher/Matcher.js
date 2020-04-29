import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Geolocator from "./Geolocator";
import { getGeolocation } from "../../actions/geolocation";
import { createMessage, MESSAGE_ERROR } from "../../actions/messages";
import ActualMatcher from "./ActualMatcher";
import { askForMatch, endMeeting } from "../../actions/matcher";
import CurrentMeeting from "./CurrentMeeting";
import Loading from "../layout/Loading";

import WebSocketClient from "../../services/WebSocketClient";

export class Matcher extends Component {
  constructor(props) {
    super(props);

    if (WebSocketClient.connect() === false) {
      this.props.createMessage(
        MESSAGE_ERROR,
        "unable to establish update connection with server"
      );
    } else {
      WebSocketClient.waitForSocketConnection(() => {
        WebSocketClient.addCallback(this.props.askForMatch);
      });
    }
  }
  static propTypes = {
    getGeolocation: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    coords: PropTypes.object.isRequired,
    timestamp: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    accepted: PropTypes.bool.isRequired,
    currentMatch: PropTypes.object,
    endMeeting: PropTypes.func.isRequired,
    askForMatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.timestamp === -1) {
      this.props.getGeolocation();
    }
    this.props.askForMatch();
  }

  render() {
    const { accepted, isLoading, currentMatch } = this.props;

    const whenLoading = (
      <Fragment>
        <div className="border-top my-5" data-test="loading"></div>

        <Loading />
      </Fragment>
    );

    const whenNotAccepted = (
      <Fragment>
        <div className="border-top my-5" data-test="not-accepted"></div>
        <Geolocator />
      </Fragment>
    );

    const whenAccepted = (
      <Fragment>
        <div className="border-top my-5" data-test="accepted"></div>
        <ActualMatcher />
      </Fragment>
    );

    let currentView = null;
    if (currentMatch) {
      currentView = (
        <Fragment>
          <div className="border-top my-5" data-test="accepted"></div>
          <div className="container d-flex justify-content-center">
            <CurrentMeeting
              first_name={currentMatch.get("first_name")}
              distance={currentMatch.get("distance")}
              // commonTags={users.first().get("common_tags")}
              match_timestamp={currentMatch.get("match_timestamp")}
              end_meeting={this.props.endMeeting}
            />
          </div>
        </Fragment>
      );
    } else if (isLoading) {
      currentView = whenLoading;
    } else if (!isLoading && accepted === true) {
      currentView = whenAccepted;
    } else {
      currentView = whenNotAccepted;
    }

    return <Fragment>{currentView}</Fragment>;
  }
}

const mapStateToProps = (state) => ({
  coords: state.getIn(["geolocation", "coords"]),
  timestamp: state.getIn(["geolocation", "timestamp"]),
  isLoading: state.getIn(["geolocation", "isLoading"]),
  accepted: state.getIn(["geolocation", "accepted"]),
  currentMatch: state.getIn(["matcher", "currentMatch"]),
});

export default connect(mapStateToProps, {
  askForMatch,
  getGeolocation,
  createMessage,
  endMeeting,
})(Matcher);
