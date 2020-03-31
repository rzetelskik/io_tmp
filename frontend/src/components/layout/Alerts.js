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
      Object.keys(errors.msg).forEach(error => {
        alert.error(`${error}: ${errors.msg.error}`);
      });
    }
    if (message !== prevProps.message) {
      console.log("asdfsadfsadf");

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
