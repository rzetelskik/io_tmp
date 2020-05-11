import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

export class Chat extends Component {
  render() {
    const { firstName } = this.props;
    return (
      <Fragment>
        <h3 className="card-header ">{firstName}</h3>
        <div className="card-body"></div>
        <div className="card-body"></div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"></li>
          <li className="list-group-item"></li>
          <li className="list-group-item"></li>
        </ul>
        <div className="modal-footer"></div>
      </Fragment>
    );
  }
}

export default connect()(Chat);
