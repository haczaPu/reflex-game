import React from "react";
import Square from "./Square";

const Board = ({ boardSize }) => {
  return (
    <div className="board">
      {boardSize.map((value, i) => {
        return <Square value={value} key={i} />;
      })}
    </div>
  );
};

export default Board;
