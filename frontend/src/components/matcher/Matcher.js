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

  // componentDidUpdate() {
  //   if (this.props.accepted === "true" && this.props.timestamp === 0) {
  //     this.props.getGeolocation();
  //   }
  // }

  componentDidMount() {
    if (this.props.accepted === "true" && this.props.timestamp === 0) {
      this.props.getGeolocation();
    }
  }

  render() {
    const { accepted, isLoading } = this.props;

    const whenLoading = <h1>Loading...</h1>;

    const whenNotAccepted = (
      <Fragment>
        <Geolocator />
      </Fragment>
    );

    const whenAccepted = (
      <Fragment>
        <ActualMatcher />
      </Fragment>
    );

    let current = {};
    if (isLoading) {
      current = whenLoading;
    } else if (accepted === "true") {
      current = whenAccepted;
    } else {
      current = whenNotAccepted;
    }

    return <Fragment>{current}</Fragment>;
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  timestamp: state.geolocation.timestamp,
  isLoading: state.geolocation.isLoading,
  accepted: state.geolocation.accepted
});

export default connect(mapStateToProps, { getGeolocation })(Matcher);
