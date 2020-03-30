import React, { Component } from "react";
import { connect } from "react-redux";
import { getGeolocation } from "../../actions/geolocation";
import PropTypes from "prop-types";

export class Matcher extends Component {
  static propTypes = {
    getGeolocation: PropTypes.func.isRequired,
    geolocation: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getGeolocation();
  }

  render() {
    return (
      <div>
        <h1>Matcher</h1>
        <h2>Oto co wiem o tobie:</h2>
        <table className="table table-dark">
          <tbody>
            {Object.keys(this.props.geolocation).map(fieldName => {
              return (
                <tr>
                  <td>{fieldName}</td>
                  <td>{this.props.geolocation[fieldName]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  geolocation: state.geolocation
});

export default connect(mapStateToProps, { getGeolocation })(Matcher);
