import React, { useEffect, useState } from "react";
import { useInterval } from "react-use";
import "./Styles.css";
import Life from "./components/LifeCounter";
import Board from "./components/Board";
import Timer from "./components/Timer";
import Popup from "./components/Popup";
import Score from "./components/Score";
import HighScores from "./components/HighScores";
import Options from "./components/Options";

//Generate Board
let BASE_BOARD = [];
for (let i = 0; i < 25; i++) {
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
  const [highScores, setHighScores] = useState([]);
  const [name, setName] = useState("");
  const [boardLength, setBoardLength] = useState(25);

  // Set new board size (options panel)
  useEffect(() => {
    BASE_BOARD = [];
    for (let i = 0; i < boardLength; i++) {
      BASE_BOARD.push(false);
    }
    setBoardSize(BASE_BOARD);
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
      setBoardSize(BASE_BOARD);
      setTimeDelay(null);
      setTargetDelay(null);

      //High scores positioning
      const comapreScores = (a, b) => {
        return b - a;
      };
      const newHighScores = [...highScores, score].sort(comapreScores);
      if (newHighScores.length > 10) {
        // eslint-disable-next-line no-unused-vars
        const newHighScores2 = newHighScores.pop();
      }
      setHighScores(newHighScores);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setLife(3);
    setScore(0);
    setTime(60);
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
      <main>
        <div className="board-container">
          <div className="numbers-container">
            <div>
              <Score score={score} />
              <Life life={life} />
            </div>
            <Timer time={time} />
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
          <Options time={time} setName={setName} name={name} setBoardLength={setBoardLength} start={start} />
          <HighScores highScores={highScores} setHighScores={setHighScores} score={score} />
        </nav>
      </main>
    </div>
  );
}

export default App;
