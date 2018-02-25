import React from "react";

const Icon = (props) => {
  return (
    <svg className="icon">
      <use xlinkHref={"#" + props.name} />
    </svg>
  );
};

export default Icon;