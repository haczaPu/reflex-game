import React from "react";

const TargetSquare = ({ score, setScore }) => {
  const onTargetClick = () => {
    setScore(score + 1);
  };

  return <button className="square-target" onClick={onTargetClick}></button>;
};

export default TargetSquare;
