import React, { useRef, useState } from "react";
import { useInterval } from "react-use";
import "./Styles.css";
import Life from "./components/LifeCounter";
import Board from "./components/Board";
import Timer from "./components/Timer";
import Popup from "./components/Popup";

const BASE_BOARD = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

function App() {
  const [life, setLife] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(60);
  const [timeDelay, setTimeDelay] = useState(null);
  const [targetDelay, setTargetDelay] = useState(null);

  const [currentTarget, setCurrentTarget] = useState();
  const [boardSize, setBoardSize] = useState(BASE_BOARD);
  const targetRef = useRef();
  targetRef.current = currentTarget;

  //Draw target
  useInterval(() => {
    setBoardSize(boardSize.fill(false));
    console.log("Hit", time);

    setCurrentTarget(Math.floor(Math.random() * boardSize.length));
    const tempBoard = boardSize;
    tempBoard[targetRef.current] = true;

    console.log(boardSize);
    setBoardSize(tempBoard);
  }, targetDelay);

  // Start
  const handleStartBtn = () => {
    setStart(true);
    setTimeDelay(1000);
    setTargetDelay(500);
  };

  //Reset
  const handleResetBtn = () => {
    setStart(false);
    setGameOver(false);
    setBoardSize(boardSize.fill(false));
    setTimeDelay(null);
    setTargetDelay(null);

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
    }
  }, timeDelay);

  return (
    <div className="App">
      <header>
        <div>Reflex Game</div>
        <Life life={life} />
        <Timer time={time} />
      </header>
      <Board boardSize={boardSize} />
      <button onClick={handleStartBtn}>Start</button>
      <button onClick={handleResetBtn}>Reset</button>

      <Popup gameOver={gameOver} />
    </div>
  );
}

export default App;
