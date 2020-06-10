import React, { Fragment, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Tag from "./Tag";
import { connect } from "react-redux";
import { updateTags } from "../../../actions/thunks/auth";

function TagsForm(props) {
  const [tags, setTags] = useState(props.tags);

  const tagsDiffer = () => {
    return JSON.stringify(tags) !== JSON.stringify(props.tags);
  };

  const apply = () => {
    if (tagsDiffer()) {
      props.updateTags(tags);
    }

    props.onHide();
  };

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2>What's on your mind?</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment> 
            <div className="container">
              {Object.entries(tags).map(([tagName, tagValue], id) => {
                return (
                  <Tag
                    key={id}
                    id={id}
                    name={tagName}
                    selected={tagValue}
                    clickTag={(id) => {
                      setTags({ ...tags, [tagName]: !tagValue });
                    }}
                  />
                );
              })}
            </div>
          </Fragment>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={apply}>Apply!</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  tags: state.getIn(["auth", "user", "tags"]).toJS(),
});

export default connect(mapStateToProps, { updateTags })(TagsForm);
