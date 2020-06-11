import React from "react";
import { connect } from "react-redux";
import { updateTags } from "../../../actions/thunks/auth";
import TagsForm from "./TagsForm";

export function TagsFormContainer(props) {
  return (
    <TagsForm
      tags={props.tags}
      updateTags={props.updateTags}
      show={props.show}
      onHide={props.onHide}
    />
  );
}

const mapStateToProps = (state) => ({
  tags: state.getIn(["auth", "user", "tags"]).toJS(),
});

export default connect(mapStateToProps, { updateTags })(TagsFormContainer);
