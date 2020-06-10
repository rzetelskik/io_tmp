import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
  MESSAGE_INFO,
} from "../../actions/action-creators/messages";

export default class Alerts extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { errors, alert, message } = this.props;
    if (errors !== prevProps.errors) {
      errors.get("msg").forEach((errorContent, errorName) => {
        if (errorName !== "non_field_errors") {
          alert.error(`${errorName}: ${errorContent.join()}`);
        } else {
          alert.error(errorContent.join());
        }
      });
    }
    if (message !== prevProps.message) {
      switch (message.get("messageType")) {
        case MESSAGE_SUCCESS:
          alert.success(message.get("msg"));
          break;
        case MESSAGE_ERROR:
          alert.error(message.get("msg"));
          break;
        case MESSAGE_INFO:
          alert.info(message.get("msg"));
          break;
        default:
          alert.show(message.get("msg"));
      }
    }
  }

  render() {
    return <Fragment />;
  }
}
