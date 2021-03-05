import React from "react";

const Board = ({ highScores, score }) => {
  return (
    <div className="highscores">
      HIGH SCORES
      <ol>
        {highScores.map((score, index) => {
          return (
            <li className="score-value" key={index}>
              TOM {score}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Board;
