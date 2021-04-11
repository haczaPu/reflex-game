import React, { useEffect, useState } from "react";
import { useInterval } from "react-use";
import "./styles/Styles.css";
import Life from "./components/LifeCounter";
import Board from "./components/Board";
import Timer from "./components/Timer";
import Popup from "./components/Popup";
import Score from "./components/Score";
import HighScores from "./components/HighScores";
import Options from "./components/Options";

//Generate Board

const generateBaseBoard = size => {
  let BASE_BOARD = [];
  for (let i = 0; i < size; i++) {
    BASE_BOARD.push(false);
  }
  return BASE_BOARD;
};

function App() {
  const [life, setLife] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timeDelay, setTimeDelay] = useState(null);
  const [targetDelay, setTargetDelay] = useState(null);
  const [boardSize, setBoardSize] = useState(generateBaseBoard());
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [name, setName] = useState("UNKNOWN");
  const [boardLength, setBoardLength] = useState(25);
  const [time, setTime] = useState(60);

  // Set new board size (options panel)
  useEffect(() => {
    setBoardSize(generateBaseBoard(boardLength));
  }, [boardLength]);

  //Get local scores
  useEffect(() => {
    const getLocalScores = () => {
      if (localStorage.getItem("highScores") === null) {
        localStorage.setItem("highScores", JSON.stringify([]));
      } else {
        let scoresLocal = JSON.parse(localStorage.getItem("highScores"));
        setHighScores(scoresLocal);
      }
    };
    getLocalScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Save score to local
  useEffect(() => {
    const saveLocalScores = () => {
      localStorage.setItem("highScores", JSON.stringify(highScores));
    };
    saveLocalScores();
  }, [highScores]);

  //Life count - game over check -
  useEffect(() => {
    if (life === 0) {
      setGameOver(true);
      setBoardSize(generateBaseBoard(boardLength));
      setTimeDelay(null);
      setTargetDelay(null);

      //High scores positioning
      const comapreScores = (a, b) => {
        return b.score - a.score;
      };
      const newHighScores = [...highScores, { name: name, score: score }].sort(comapreScores).slice(0, 10);
      setHighScores(newHighScores);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [life]);

  //Lvl change
  useEffect(() => {
    if (time === 90) {
      if (timer < 75) {
        setTargetDelay(800);
      }
      if (timer < 55) {
        setTargetDelay(700);
      }
      if (timer < 30) {
        setTargetDelay(600);
      }
      if (timer < 10) {
        setTargetDelay(500);
      }
    } else {
      if (timer < 50) {
        setTargetDelay(800);
      }
      if (timer < 35) {
        setTargetDelay(700);
      }
      if (timer < 20) {
        setTargetDelay(600);
      }
      if (timer < 10) {
        setTargetDelay(500);
      }
    }
  }, [timer, time]);

  //Draw target
  useInterval(() => {
    let newBoard = generateBaseBoard(boardLength);
    newBoard[Math.floor(Math.random() * boardLength)] = true;
    setBoardSize(newBoard);
  }, targetDelay);

  //Start
  const handleStartBtn = () => {
    setStart(true);
    setGameOver(false);
    setTimeDelay(1000);
    setTargetDelay(1000);
    setLife(3);
    setScore(0);
    setTimer(time);
  };

  //Reset
  const handleResetBtn = () => {
    setStart(false);
    setGameOver(false);
    setBoardSize(generateBaseBoard(boardLength));
    setTimeDelay(null);
    setTargetDelay(null);
    setLife(3);
    setScore(0);
    setTimer(time);
  };

  //Timer
  useInterval(() => {
    if (start && timer > 0) {
      setTimer(timer - 1);
    } else if (timer === 0) {
      setStart(false);
      setGameOver(true);
      setTargetDelay(null);
    }
  }, timeDelay);

  return (
    <div className="App">
      <header>REFLEX</header>
      <main>
        <div className="board-container">
          <div className="numbers-container">
            <div>
              <Score score={score} />
              <Life life={life} />
            </div>
            <Timer timer={timer} />
          </div>
          <Board
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
          <Popup gameOver={gameOver} />
        </div>
        <nav>
          <Options
            setTimer={setTimer}
            setTime={setTime}
            time={time}
            setName={setName}
            name={name}
            setBoardLength={setBoardLength}
            boardLength={boardLength}
            start={start}
          />
          <HighScores highScores={highScores} />
        </nav>
      </main>
    </div>
  );
}

export default App;
