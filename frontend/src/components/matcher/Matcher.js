import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Geolocator from "./Geolocator";
import ActualMatcherContainer from "./ActualMatcherContainer";
import CurrentMeeting from "../meeting/CurrentMeeting";
import Loading from "../layout/Loading";

export default class Matcher extends Component {
  static propTypes = {
    getGeolocation: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    coords: PropTypes.object.isRequired,
    timestamp: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    accepted: PropTypes.bool.isRequired,
    currentMatch: PropTypes.object,
    endMeeting: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.timestamp === -1) {
      this.props.getGeolocation();
    }
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
        <ActualMatcherContainer />
      </Fragment>
    );

    let currentView = null;
    if (currentMatch) {
      currentView = (
        <Fragment>
          <div className="border-top my-5" data-test="accepted"></div>
          <div className="container d-flex justify-content-center">
            <CurrentMeeting
              firstName={currentMatch.get("first_name")}
              distance={currentMatch.get("distance")}
              commonTags={currentMatch.get("common_tags")}
              matchTimestamp={currentMatch.get("match_timestamp")}
              endMeeting={this.props.endMeeting}
              aliveMeeting={true}
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
