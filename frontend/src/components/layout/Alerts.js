import React, {Component, Fragment} from "react";
import {withAlert} from "react-alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const {errors, alert, messages} = this.props;
    if (errors !== prevProps.errors) {
      if (errors.msg.username) {
        alert.error(`Username: ${errors.msg.username.join()}`);
      }
      if (errors.msg.password) {
        alert.error(`Password: ${errors.msg.password.join()}`);
      }
      if (errors.msg.password1) {
        alert.error(`Password: ${errors.msg.password1.join()}`);
      }
      if (errors.msg.password2) {
        alert.error(`Password repeat: ${errors.msg.password2.join()}`);
      }
      if (errors.msg.email) {
        alert.error(`Email: ${errors.msg.email.join()}`);
      }
      if (errors.msg.first_name) {
        alert.error(`First name: ${errors.msg.first_name.join()}`);
      }
      if (errors.msg.last_name) {
        alert.error(`Last name: ${errors.msg.last_name.join()}`);
      }
      if (errors.msg.non_field_errors) {
        alert.error(errors.msg.non_field_errors.join());
      }
    }
    if (messages !== prevProps.messages) {
      if (messages.logout) {
        alert.success(messages.logout);
      }
      if (messages.login) {
        alert.success(messages.login);
      }
      if (messages.changePassword) {
        alert.success(messages.changePassword);
      }
      if (messages.register) {
        alert.success(messages.register);
      }
      if (messages.passwordNotMatch) {
        alert.info(messages.passwordNotMatch);
      }
      if (messages.updateDetails) {
        alert.info(messages.updateDetails)
      }
      if (messages.detailsNotChanged) {
        alert.info(messages.detailsNotChanged);
      }
    }
  }

  render() {
    return <Fragment/>;
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
