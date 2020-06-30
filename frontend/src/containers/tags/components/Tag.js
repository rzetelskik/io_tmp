import React, { Fragment, useState } from "react";

const Tag = (props) => {
  const [selected, setSelected] = useState(props.selected);
  return (
    <Fragment>
      <button
        type="button"
        onClick={() => {
          setSelected(!selected);
          props.clickTag(props.id);
        }}
        className={
          selected
            ? "btn btn-secondary my-1 mx-1"
            : "btn btn-outline-secondary my-1 mx-1"
        }
      >
        {props.name}
      </button>
    </Fragment>
  );
};

export default Tag;