import React, { Component } from "react";
import PropTypes from "prop-types";
import { MESSAGE_ERROR } from "../../actions/action-creators/messages";
import { Link } from "react-router-dom";

export default class UpdateDetailsForm extends Component {
  static propTypes = {
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    location_range: PropTypes.string.isRequired,
    updateDetails: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
  };

  state = {
    first_name: this.props.first_name,
    last_name: this.props.last_name,
    location_range: this.props.location_range,
    disabled: true,
  };

  detailsUpdated() {
    return (
      this.state.first_name.localeCompare(this.props.first_name) !== 0 ||
      this.state.last_name.localeCompare(this.props.last_name) !== 0 ||
      this.state.location_range.localeCompare(this.props.location_range) !== 0
    );
  }

  componentDidUpdate() {
    if (this.detailsUpdated() && this.state.disabled) {
      this.setState({
        disabled: false,
      });
    }
    if (!this.detailsUpdated() && !this.state.disabled) {
      this.setState({
        disabled: true,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      disabled: this.detailsUpdated(),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, location_range, disabled } = this.state;
    if (disabled) {
      this.props.createMessage(
        MESSAGE_ERROR,
        "At least one field has to differ."
      );
      return;
    }
    this.props.updateDetails(first_name, last_name, location_range);
  };

  render() {
    const { first_name, last_name, location_range, disabled } = this.state;
    return (
      <div className="card card-body mt-4 mb-4" data-test="form">
        <h2 className="mx-auto">Account details</h2>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="first_name_group">First name</label>
          <div className="form-group" id="first_name_group">
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              onChange={this.onChange}
              value={first_name}
            />
          </div>
          <label htmlFor="last_name_group">Last name</label>
          <div className="form-group" id="last_name_group">
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              onChange={this.onChange}
              value={last_name}
            />
          </div>
          <label htmlFor="location_range_field">Location range</label>
          <div className="form-group" id="location_range_group">
            <p className="text-right">{location_range}</p>
            <input
              type="range"
              className="custom-range"
              id="location_range"
              name="location_range"
              onChange={this.onChange}
              value={location_range}
              step="1"
              min="1"
              max="50"
            />
          </div>
          <div className="d-flex flex-row justify-content-between">
            <button
              type="submit"
              className={
                disabled
                  ? "p-1 btn btn-primary disabled"
                  : "p-1 btn btn-primary"
              }
            >
              Update
            </button>
            <Link to="/change-password" className="p-2 float-right">
              <button type="button" className="btn btn-dark">
                Change password
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
