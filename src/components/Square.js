import React from "react";

const Square = ({ life, setLife, start, gameOver }) => {
  const onSquareClick = () => {
    setLife(life - 1);
  };

  return <button disabled={!start || gameOver} className="square" onClick={onSquareClick}></button>;
};

export default Square;
