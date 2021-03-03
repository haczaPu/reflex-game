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
  const [time, setTime] = useState(60);
  const [timeDelay, setTimeDelay] = useState(null);
  const [targetDelay, setTargetDelay] = useState(null);
  const [boardSize, setBoardSize] = useState(BASE_BOARD);
  const [score, setScore] = useState(0);
  const [ommited, setOmmited] = useState(true);

  //Ommited target
  // useEffect(() => {
  //   if (ommited) {
  //     setLife(life - 1);
  //   }
  // }, [ommited]);

  //Life count - game over check
  useEffect(() => {
    if (life === 0) {
      setGameOver(true);
      setBoardSize(BASE_BOARD);
      setTimeDelay(null);
      setTargetDelay(null);
    }
  }, [life]);

  //Lvl change
  useEffect(() => {
    if (time < 50) {
      setTargetDelay(800);
    }
    if (time < 35) {
      setTargetDelay(700);
    }
    if (time < 20) {
      setTargetDelay(600);
    }
    if (time < 10) {
      setTargetDelay(500);
    }
  }, [time]);

  //Draw target
  useInterval(() => {
    const newBoard = [...BASE_BOARD];
    newBoard[Math.floor(Math.random() * BASE_BOARD.length)] = true;
    setBoardSize(newBoard);
  }, targetDelay);

  //Start
  const handleStartBtn = () => {
    setStart(true);
    setGameOver(false);
    setTimeDelay(1000);
    setTargetDelay(1000);
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
      <header>REFLEX</header>

      <div className="board-container">
        <div className="numbers-container">
          <div>
            <Score score={score} />
            <Life life={life} />
          </div>
          <Timer time={time} />
        </div>

        <Board
          ommited={ommited}
          setOmmited={setOmmited}
          start={start}
          boardSize={boardSize}
          setLife={setLife}
          life={life}
          score={score}
          setScore={setScore}
          gameOver={gameOver}
        />
        <div className="buttons">
          <button className="start" onClick={handleStartBtn}>
            START
          </button>
          <button className="reset" onClick={handleResetBtn}>
            RESET
          </button>
        </div>
      </div>

      <Popup gameOver={gameOver} />
    </div>
  );
}

export default App;
