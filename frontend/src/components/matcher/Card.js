import React, { Component } from "react";

export class Card extends Component {
  render() {
    return (
      <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">First name</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Distance</li>
          <li class="list-group-item">Tags</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">
            Card link
          </a>
          <a href="#" class="card-link">
            Another link
          </a>
        </div>
      </div>
    );
  }
}

export default Card;
