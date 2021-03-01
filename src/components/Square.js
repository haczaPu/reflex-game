import React from "react";

const Square = ({ value, i }) => {
  return (
    <button value={i} className={`square${value ? "-target" : ""}`}>
      {i}
    </button>
  );
};

export default Square;
