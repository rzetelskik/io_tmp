import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
  MESSAGE_INFO
} from "../../actions/messages";

export class Alerts extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { errors, alert, message } = this.props;
    if (errors !== prevProps.errors) {
      for (var errorName in errors.msg) {
        if (errorName !== "non_field_errors") {
          alert.error(`${errorName}: ${errors.msg[errorName].join()}`);
        } else {
          alert.error(errors.msg[errorName].join());
        }
      }
    }
    if (message !== prevProps.message) {
      switch (message.messageType) {
        case MESSAGE_SUCCESS:
          alert.success(message.msg);
          break;
        case MESSAGE_ERROR:
          alert.error(message.msg);
          break;
        case MESSAGE_INFO:
          alert.info(message.msg);
          break;
        default:
          alert.show(message.msg);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  message: state.message
});

export default connect(mapStateToProps)(withAlert()(Alerts));
