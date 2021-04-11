import React from "react";

const Board = ({ highScores }) => {
  return (
    <div className="highscores">
      HIGH SCORES
      <ol>
        {highScores.map(({ name, score }, index) => {
          return (
            <li key={index}>
              {name}
              <div className="score-value">{score}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Board;
