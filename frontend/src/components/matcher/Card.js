import React, { Component, Fragment } from "react";
import example_img from "../../data/images/example_img.jpeg";
import { connect } from "react-redux";

export class Card extends Component {
  render() {
    const { onUserAccept, onUserDeny, first_name } = this.props;
    return (
      <Fragment>
        <div className="card w-50  border-secondary ">
          <h3 className="card-header ">{first_name}</h3>
          <div className="card-body"></div>
          <img className="card-img-top" src={example_img} alt="Card" />
          <div className="card-body"></div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"></li>
            {/* <li className="list-group-item">Distance</li> */}
            <li className="list-group-item">Tags</li>
          </ul>
          <div className="modal-footer">
            <button
              onClick={onUserDeny}
              type="button"
              className="btn btn-secondary"
            >
              Maybe not...
            </button>
            <button
              onClick={onUserAccept}
              type="button"
              className="btn btn-primary"
            >
              Meet them!
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  first_name: ownProps.first_name,
  onUserAccept: ownProps.onUserAccept,
  onUserDeny: ownProps.onUserDeny
});

export default connect(mapStateToProps)(Card);
