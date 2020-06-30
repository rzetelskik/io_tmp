import React from "react";
import { connect } from "react-redux";
import { updateTags } from "../../thunks/auth";
import TagsForm from "./components";
import { selectUser } from "../../reducer";

const TagsFormContainer = (props) => {
  return (
    <TagsForm
      tags={props.tags}
      updateTags={props.updateTags}
      show={props.show}
      onHide={props.onHide}
    />
  );
};

const mapStateToProps = (state) => ({
  tags: selectUser(state).get("tags").toJS(),
});

export default connect(mapStateToProps, { updateTags })(TagsFormContainer);
