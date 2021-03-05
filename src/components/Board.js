import React from "react";
import Square from "./Square";
import TargetSquare from "./TargetSquare";

const Board = ({ boardSize, score, setScore, life, setLife, start, gameOver }) => {
  return (
    <div className="board">
      {boardSize.map((value, i) => {
        return !value ? (
          <Square start={start} life={life} setLife={setLife} key={i} gameOver={gameOver} />
        ) : (
          <TargetSquare score={score} setScore={setScore} key={i} />
        );
      })}
    </div>
  );
};

export default Board;
