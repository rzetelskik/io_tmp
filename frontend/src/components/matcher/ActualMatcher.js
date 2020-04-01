import React, { Component } from "react";
import Card from "./Card";
import { sendLocation } from "../../actions/geolocation";
import { getUserOffers } from "../../actions/matcher";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class ActualMatcher extends Component {
  static propTypes = {
    coords: PropTypes.object.isRequired,
    sendLocation: PropTypes.func.isRequired,
    locationSent: PropTypes.bool.isRequired,
    getUserOffers: PropTypes.func.isRequired
  };

  componentDidMount() {
    const location = {
      location_latitude: this.props.coords.latitude,
      location_longitude: this.props.coords.longitude
    };
    this.props.sendLocation(location);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locationSent === false && this.props.locationSent === true) {
      this.props.getUserOffers();
    }
  }

  render() {
    return <Card />;
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  locationSent: state.geolocation.locationSent
});

export default connect(mapStateToProps, { getUserOffers, sendLocation })(
  ActualMatcher
);
