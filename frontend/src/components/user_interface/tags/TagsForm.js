import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import Tag from "./Tag";

const dummyTags = [
  ["dupsko", false],
  ["kupsko", false],
  ["drogeria", false],
  ["rossman", false],
];

export default function TagsForm(props) {
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
            {dummyTags.map((tag, id) => (
              <Tag
                key={id}
                id={id}
                name={tag[0]}
                selected={tag[1]}
                clickTag={(id) => {
                  console.log(dummyTags);

                  dummyTags[id][1] = !dummyTags[id][1];
                }}
              />
            ))}
          </Fragment>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Apply!</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
