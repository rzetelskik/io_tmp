import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

export class Chat extends Component {
  render() {
    const { firstName } = this.props;
    return (
      <Fragment>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-white bg-secondary">
            <h3 className="">{firstName}</h3>
          </li>

          <li>
            <div className="card-body bg-light text-dark">
              tutaj wsadzimy chat
            </div>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default connect()(Chat);
