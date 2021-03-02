import React from "react";

const Square = ({ life, setLife, start }) => {
  const onSquareClick = () => {
    setLife(life - 1);
  };

  return <button disabled={!start} className="square" onClick={onSquareClick}></button>;
};

export default Square;
