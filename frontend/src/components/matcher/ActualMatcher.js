import React, { Component, Fragment } from "react";
import Card from "./Card";
import { sendLocation } from "../../actions/geolocation";
import { getUserOffers, nextUser } from "../../actions/matcher";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class ActualMatcher extends Component {
  static propTypes = {
    getUserOffers: PropTypes.func.isRequired,
    sendLocation: PropTypes.func.isRequired,
    nextUser: PropTypes.func.isRequired,
    coords: PropTypes.object.isRequired,
    locationSent: PropTypes.bool.isRequired,
    timestamp: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
    userCount: PropTypes.number.isRequired
  };

  componentDidMount() {
    const location = {
      latitude: this.props.coords.latitude,
      longitude: this.props.coords.longitude,
      location_timestamp: this.props.timestamp
    };

    this.props.sendLocation(location);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locationSent === false && this.props.locationSent === true) {
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
            onUserAccept={this.onUserAccept}
            onUserDeny={this.onUserAccept}
            first_name={users[0].first_name}
            distance={users[0].distance}
          />
        </div>
      );
    }

    return <Fragment>{currentView}</Fragment>;
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  locationSent: state.geolocation.locationSent,
  timestamp: state.geolocation.timestamp,
  users: state.matcher.users,
  userCount: state.matcher.userCount
});

export default connect(mapStateToProps, {
  getUserOffers,
  sendLocation,
  nextUser
})(ActualMatcher);
