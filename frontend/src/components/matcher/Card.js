import React, { Component, Fragment } from "react";
import example_img from "../../data/images/example_img.jpeg";
import { connect } from "react-redux";

export class Card extends Component {
  acceptMatch = () => {
    const username = this.props.username;
    this.props.decide(true, username);
  };

  rejectMatch = () => {
    const username = this.props.username;
    this.props.decide(false, username);
  };

  render() {
    const { first_name, distance } = this.props;
    return (
      <Fragment>
        <div className="card w-50  border-secondary ">
          <h3 className="card-header ">{first_name}</h3>
          <div className="card-body"></div>
          <img className="card-img-top" src={example_img} alt="Card" />
          <div className="card-body"></div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"></li>
            <li className="list-group-item">
              Distance: {Math.round(distance)}km
            </li>
            <li className="list-group-item">Tags</li>
          </ul>
          <div className="modal-footer">
            <button
              onClick={this.rejectMatch}
              type="button"
              className="btn btn-secondary"
            >
              Maybe not...
            </button>
            <button
              onClick={this.acceptMatch}
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
  username: ownProps.username,
  first_name: ownProps.first_name,
  distance: ownProps.distance,
  decide: ownProps.decide,
});

export default connect(mapStateToProps)(Card);
