import React, { Component, Fragment } from "react";
import Card from "./Card";
import PropTypes from "prop-types";

export default class ActualMatcher extends Component {
  static propTypes = {
    getUserOffers: PropTypes.func.isRequired,
    sendLocation: PropTypes.func.isRequired,
    matcherAnswer: PropTypes.func.isRequired,
    coords: PropTypes.object.isRequired,
    locationSent: PropTypes.bool.isRequired,
    timestamp: PropTypes.number.isRequired,
    users: PropTypes.object.isRequired,
    userCount: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const location = {
      latitude: this.props.coords.latitude,
      longitude: this.props.coords.longitude,
      location_timestamp: this.props.timestamp,
    };

    this.props.sendLocation(location);
  }

  componentDidUpdate(prevProps) {
    if (this.props.locationSent === true && this.props.userCount === 0) {
      this.props.getUserOffers();
    }
  }

  onUserAccept = () => {
    this.props.nextUser();
  };

  onUserDeny = () => {
    this.props.nextUser();
  };

  render() {
    const { users, userCount } = this.props;

    let currentView;

    if (userCount === 0) {
      currentView = <h1>No more users in this distance ):</h1>;
    } else {
      currentView = (
        <div className="container d-flex justify-content-center">
          <Card
            decide={this.props.matcherAnswer}
            firstName={users.first().get("first_name")}
            distance={users.first().get("distance")}
            username={users.first().get("username")}
            commonTags={users.first().get("common_tags")}
          />
        </div>
      );
    }

    return <Fragment>{currentView}</Fragment>;
  }
}
