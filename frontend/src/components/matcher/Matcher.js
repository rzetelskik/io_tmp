import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Geolocator from "./Geolocator";
import { getGeolocation } from "../../actions/geolocation";
import ActualMatcher from "./ActualMatcher";

export class Matcher extends Component {
  static propTypes = {
    getGeolocation: PropTypes.func.isRequired,
    coords: PropTypes.object.isRequired,
    timestamp: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    accepted: PropTypes.string.isRequired
  };

  componentDidMount() {
    if (this.props.timestamp === -1) {
      this.props.getGeolocation();
    }
  }

  render() {
    const { accepted, isLoading } = this.props;

    const whenLoading = (
      <Fragment>
        <div className="border-top my-5"></div>
        <h1>Loading...</h1>
      </Fragment>
    );

    const whenNotAccepted = (
      <Fragment>
        <div className="border-top my-5"></div>
        <Geolocator />
      </Fragment>
    );

    const whenAccepted = (
      <Fragment>
        <div className="border-top my-5"></div>
        <ActualMatcher />
      </Fragment>
    );

    let currentView = {};
    if (isLoading) {
      currentView = whenLoading;
    } else if (!isLoading && accepted === true) {
      currentView = whenAccepted;
    } else {
      currentView = whenNotAccepted;
    }

    return <Fragment>{currentView}</Fragment>;
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  timestamp: state.geolocation.timestamp,
  isLoading: state.geolocation.isLoading,
  accepted: state.geolocation.accepted
});

export default connect(mapStateToProps, { getGeolocation })(Matcher);
