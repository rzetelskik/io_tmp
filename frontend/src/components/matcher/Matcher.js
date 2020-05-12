import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Geolocator from "./Geolocator";
import { getGeolocation } from "../../actions/geolocation";
import { createMessage, MESSAGE_ERROR } from "../../actions/messages";
import { newMessage, setMessages } from "../../actions/chat";
import ActualMatcher from "./ActualMatcher";
import { askForMatch, endMeeting } from "../../actions/matcher";
import CurrentMeeting from "../meeting/CurrentMeeting";
import Loading from "../layout/Loading";
import MatchClient from "../../services/MatchClient";

export class Matcher extends Component {
  constructor(props) {
    super(props);

    if (MatchClient.connect() === false) {
      this.props.createMessage(
        MESSAGE_ERROR,
        "unable to establish update connection with server"
      );
    } else {
      MatchClient.waitForSocketConnection(() => {
        MatchClient.addCallback({
          match_created: this.props.askForMatch,
          match_terminated: this.props.askForMatch,
          new_message: this.props.newMessage,
          messages: this.props.setMessages,
        });
        MatchClient.newChatMessage({
          match_id: this.props.currentMatch.get("match_id"),
          text: "gówno",
        });
        MatchClient.fetchMessages(this.props.currentMatch.get("match_id"));
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
              firstName={currentMatch.get("first_name")}
              distance={currentMatch.get("distance")}
              commonTags={currentMatch.get("common_tags")}
              matchTimestamp={currentMatch.get("match_timestamp")}
              endMeeting={this.props.endMeeting}
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
  setMessages,
  newMessage,
})(Matcher);
