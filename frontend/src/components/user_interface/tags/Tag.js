import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export class Tag extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    clickTag: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Fragment>
        <button
          type="button"
          onClick={this.props.clickTag(this.props.id)}
          className={
            this.props.selected
              ? "btn btn-secondary"
              : "btn btn-outline-secondary"
          }
        >
          {this.props.name}
        </button>
      </Fragment>
    );
  }
}

export default Tag;
