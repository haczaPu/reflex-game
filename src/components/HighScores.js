import React from "react";

const Board = ({ highScores, score }) => {
  return (
    <div className="highscores">
      HIGH SCORES
      <ol>
        {highScores.map((score, index) => {
          return (
            <li key={index}>
              TOM <div className="score-value">{score}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Board;
