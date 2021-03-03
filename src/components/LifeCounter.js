import React from "react";

const LifeCounter = ({ life }) => {
  return (
    <div className="life">
      LIFE:
      <div>{life}</div>
    </div>
  );
};

export default LifeCounter;
