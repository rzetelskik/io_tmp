import React, { Fragment, useState } from "react";

export default function Tag(props) {
  const [selected, setSelected] = useState(props.selected);
  return (
    <Fragment>
      <button
        type="button"
        onClick={() => {
          setSelected(!selected);
          props.clickTag(props.id);
        }}
        className={selected ? "btn btn-secondary" : "btn btn-outline-secondary"}
      >
        {props.name}
      </button>
    </Fragment>
  );
}
