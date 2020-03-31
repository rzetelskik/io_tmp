import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Geolocator from "./Geolocator";
import { getGeolocation } from "../../actions/geolocation";

export class Matcher extends Component {
  static propTypes = {
    getGeolocation: PropTypes.func.isRequired,
    coords: PropTypes.object.isRequired,
    timestamp: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    accepted: PropTypes.string.isRequired
  };

  componentDidUpdate() {
    if (this.props.accepted === "true" && this.props.timestamp === 0) {
      this.props.getGeolocation();
    }
  }

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
        <div>
          <h1>Matcher</h1>
          <h2>Here's what I know about you:</h2>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">field</th>
                <th scope="col">value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>latitude</td>
                <td>{this.props.coords.latitude}</td>
              </tr>
              <tr>
                <td>longitude</td>
                <td>{this.props.coords.longitude}</td>
              </tr>
              <tr>
                <td>accuracy</td>
                <td>{this.props.coords.accuracy}</td>
              </tr>
            </tbody>
          </table>
          <p>Updated at: {this.props.timestamp}</p>
        </div>
      </Fragment>
    );

    return (
      <Fragment>
        {isLoading
          ? whenLoading
          : accepted === "true"
          ? whenAccepted
          : whenNotAccepted}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  timestamp: state.geolocation.timestamp,
  isLoading: state.geolocation.isLoading,
  accepted: state.geolocation.accepted
});

export default connect(mapStateToProps, { getGeolocation })(Matcher);
