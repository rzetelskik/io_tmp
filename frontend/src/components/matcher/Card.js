import React, { Component, Fragment } from "react";
import example_img from "../../data/images/example_img.jpeg";

export class Card extends Component {
  render() {
    return (
      <Fragment>
        <div className="card w-50  border-secondary ">
          <h3 className="card-header ">First name</h3>
          <div className="card-body"></div>
          <img className="card-img-top" src={example_img} alt="Card" />
          <div className="card-body"></div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"></li>
            <li className="list-group-item">Distance</li>
            <li className="list-group-item">Tags</li>
          </ul>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              Maybe not...
            </button>
            <button type="button" className="btn btn-primary">
              Meet them!
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Card;
