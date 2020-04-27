import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateDetails } from "../../actions/auth";
import { createMessage, MESSAGE_ERROR } from "../../actions/messages";
import { Link } from "react-router-dom";

export class SetTagsForm extends Component {
  static propTypes = {
    // lista tag : bool
    updateTags: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
  };

  state = {
    //lista tag: bool
    location_range: this.props.location_range,
    disabled: true,
  };

  detailsUpdated() {
    return !(
      this.state.first_name !== this.props.first_name ||
      this.state.last_name !== this.props.last_name ||
      this.state.location_range !== this.props.location_range
    );
  }

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
      disabled: this.detailsUpdated(),
    });

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
    const singleTag = (tag) => {
      return (
        <Fragment>
          <label className="btn btn-outline-secondary active">
            <input type="checkbox" autocomplete="off" /> {tag}
          </label>
        </Fragment>
      );
    };
    return (
      <div className="card card-body mt-4 mb-4" data-test="form">
        <h2 className="mx-auto">Tags</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  first_name: state.getIn(["auth", "user", "first_name"]),
  last_name: state.getIn(["auth", "user", "last_name"]),
  location_range: state.getIn(["auth", "user", "location_range"]),
});

export default connect(mapStateToProps, { updateDetails, createMessage })(
  UpdateDetailsForm
);
