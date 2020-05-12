import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Chat from "./Chat";

export class ChatCard extends Component {
  render() {
    const { firstName } = this.props;

    const inputForm = (
      <Fragment>
        <div className="card-body bg-light text-dark">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message"
              aria-label="Type your message"
              aria-describedby="button-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-primary"
                type="button"
                id="button-addon2"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );

    return (
      <Fragment>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-white bg-secondary">
            <h3 className="">{firstName}</h3>
          </li>

          <Chat firstName={this.props.firstName} />
        </ul>
      </Fragment>
    );
  }
}

export default connect()(ChatCard);
