import React from "react";

const Options = ({ setTime, time, setTimer, setName, name, setBoardLength, boardLength, start }) => {
  //Change time
  const handleChangeTime60OnClick = () => {
    setTimer(60);
    setTime(60);
  };
  const handleChangeTime90OnClick = () => {
    setTimer(90);
    setTime(90);
  };

  // Change board size
  const handleOnInputChange = e => {
    setName(e.target.value);
  };
  const handleFiveByFiveOnClick = () => {
    setBoardLength(25);
  };
  const handleSevenBySevenOnClick = () => {
    setBoardLength(49);
  };
  const handleTenByTenOnClick = () => {
    setBoardLength(100);
  };

  return (
    <div className="options">
      options
      <div className="name">
        NAME: <input onChange={handleOnInputChange} placeholder="Player name" type="text" maxLength="10"></input>
      </div>
      <div className="timeSetup">
        TIME:
        <button className={`${time === 60 ? "btn-active" : ""}`} disabled={start} onClick={handleChangeTime60OnClick}>
          60
        </button>
        <button className={`${time === 90 ? "btn-active" : ""}`} disabled={start} onClick={handleChangeTime90OnClick}>
          90
        </button>
      </div>
      <div>
        BOARD SIZE:
        <div className="sizeButtons">
          <button
            className={`${boardLength === 25 ? "btn-active" : ""}`}
            disabled={start}
            onClick={handleFiveByFiveOnClick}
          >
            5x5
          </button>
          <button
            className={`${boardLength === 49 ? "btn-active" : ""}`}
            disabled={start}
            onClick={handleSevenBySevenOnClick}
          >
            7x7
          </button>
          <button
            className={`${boardLength === 100 ? "btn-active" : ""}`}
            disabled={start}
            onClick={handleTenByTenOnClick}
          >
            10x10
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
