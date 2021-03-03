import React from "react";

const TargetSquare = ({ score, setScore, ommited, setOmmited }) => {
  const onTargetClick = () => {
    setScore(score + 1);
    setOmmited(false);
  };

  return <button className="square-target" onClick={onTargetClick}></button>;
};

export default TargetSquare;
