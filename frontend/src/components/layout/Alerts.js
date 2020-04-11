import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
  MESSAGE_INFO,
} from "../../actions/messages";

export class Alerts extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { errors, alert, message } = this.props;
    if (errors !== prevProps.errors) {
      console.log(errors);
      errors.get("msg").map((errorContent, errorName) => {
        if (errorName !== "non_field_errors") {
          console.log(errorName);

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

const mapStateToProps = (state) => ({
  errors: state.get("errors"),
  message: state.get("message"),
});

export default connect(mapStateToProps)(withAlert()(Alerts));
