import React from "react";

const Square = ({ life, setLife, start, gameOver, sizeSquare }) => {
  const onSquareClick = () => {
    setLife(life - 1);
  };

  return <button disabled={!start || gameOver} className={`square ${sizeSquare}`} onClick={onSquareClick}></button>;
};

export default Square;
