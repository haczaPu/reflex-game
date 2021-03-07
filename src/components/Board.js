import React from "react";
import Square from "./Square";
import TargetSquare from "./TargetSquare";

const Board = ({ boardSize, score, setScore, life, setLife, start, gameOver }) => {
  let sizeStyleProperties = "fiveByFive";
  let sizeSquare = "sFive";
  switch (boardSize.length) {
    case 100:
      sizeStyleProperties = "tenByTen";
      sizeSquare = "sTen";
      break;
    case 49:
      sizeStyleProperties = "sevenBySeven";
      sizeSquare = "sSeven";
      break;
    default:
      sizeStyleProperties = "fiveByFive";
      sizeSquare = "sFive";
      break;
  }

  return (
    <div className={`board ${sizeStyleProperties}`}>
      {boardSize.map((value, i) => {
        return !value ? (
          <Square start={start} life={life} setLife={setLife} key={i} gameOver={gameOver} sizeSquare={sizeSquare} />
        ) : (
          <TargetSquare score={score} setScore={setScore} key={i} sizeSquare={sizeSquare} />
        );
      })}
    </div>
  );
};

export default Board;
