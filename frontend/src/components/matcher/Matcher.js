import React, { Component } from "react";
import { connect } from "react-redux";
import { getGeolocation } from "../../actions/geolocation";
import PropTypes from "prop-types";

export class Matcher extends Component {
  static propTypes = {
    getGeolocation: PropTypes.func.isRequired,
    coords: PropTypes.object.isRequired,
    timestamp: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.props.getGeolocation();
  }

  render() {
    return (
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
    );
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  timestamp: state.geolocation.timestamp
});

export default connect(mapStateToProps, { getGeolocation })(Matcher);
