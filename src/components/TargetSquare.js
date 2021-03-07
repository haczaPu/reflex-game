import React from "react";

const TargetSquare = ({ score, setScore, sizeSquare }) => {
  const onTargetClick = () => {
    setScore(score + 1);
  };

  return <button className={`square-target ${sizeSquare}`} onClick={onTargetClick}></button>;
};

export default TargetSquare;
