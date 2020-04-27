import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export class Tag extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    clickTag: PropTypes.func.isRequired,
  };

  state = {
    selected: this.props.selected,
  };

  render() {
    return (
      <Fragment>
        <button
          type="button"
          onClick={() => {
            this.setState({ selected: !this.state.selected });
            this.props.clickTag(this.props.id);
          }}
          className={
            this.state.selected
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
