import React, { useEffect, useState } from "react";
import { useInterval } from "react-use";
import "./Styles.css";
import Life from "./components/LifeCounter";
import Board from "./components/Board";
import Timer from "./components/Timer";
import Popup from "./components/Popup";
import Score from "./components/Score";

//Generate Board
const BASE_BOARD = [];
const length = 25;
for (let i = 0; i < length; i++) {
  BASE_BOARD.push(false);
}

function App() {
  const [life, setLife] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(40);
  const [timeDelay, setTimeDelay] = useState(null);
  const [targetDelay, setTargetDelay] = useState(null);
  const [boardSize, setBoardSize] = useState(BASE_BOARD);
  const [score, setScore] = useState(0);

  //Score

  //Life count - game over check
  useEffect(() => {
    if (life === 0) {
      setGameOver(true);
      setTimeDelay(null);
      setTargetDelay(null);
    }
  }, [life]);

  //Lvl change
  useEffect(() => {
    if (time < 5) {
      setTargetDelay(500);
    }
  }, [time]);

  //Draw target
  useInterval(() => {
    const newBoard = [...BASE_BOARD];
    newBoard[Math.floor(Math.random() * BASE_BOARD.length)] = true;
    setBoardSize(newBoard);
  }, targetDelay);

  // Start
  const handleStartBtn = () => {
    setStart(true);
    setTimeDelay(1000);
    setTargetDelay(1500);
  };

  //Reset
  const handleResetBtn = () => {
    setStart(false);
    setGameOver(false);
    setBoardSize(BASE_BOARD);
    setTimeDelay(null);
    setTargetDelay(null);
    setLife(3);
    setScore(0);

    setTime(60);
    console.log("Reset");
  };

  //Timer
  useInterval(() => {
    if (start && time > 0) {
      setTime(time - 1);
    } else if (time === 0) {
      setStart(false);
      setGameOver(true);
      setTargetDelay(null);
    }
  }, timeDelay);

  return (
    <div className="App">
      <header>
        <div>Reflex Game</div>
        <Life life={life} />
        <Timer time={time} />
        <Score score={score} />
      </header>
      <Board start={start} boardSize={boardSize} setLife={setLife} life={life} score={score} setScore={setScore} />
      <button onClick={handleStartBtn}>Start</button>
      <button onClick={handleResetBtn}>Reset</button>

      <Popup gameOver={gameOver} />
    </div>
  );
}

export default App;
