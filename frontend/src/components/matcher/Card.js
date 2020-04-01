import React, { Component, Fragment } from "react";
import example_img from "../../data/images/example_img.jpeg";

export class Card extends Component {
  render() {
    return (
      <Fragment>
        <p>dupa</p>
        <div className="card" style={{ width: "18rem" }}>
          <img src={example_img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">First name</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Distance</li>
            <li className="list-group-item">Tags</li>
          </ul>
          <div className="card-body">
            <a href="#" className="card-link text-secondary">
              Maybe not...
            </a>
            <a href="#" className="card-link ">
              Meet them!
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Card;
