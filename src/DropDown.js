import React from "react";

export default props => {
  return (
    <div
      onClick={() => props.selectedItemFromFilter(props.item.item)}
      value={props.item.item}
      key={props.item.id}
    >
      {props.item.item}
    </div>
  );
};
