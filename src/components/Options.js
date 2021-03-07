import React from "react";

const Options = ({ time, setName, name, setBoardLength, start }) => {
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
      <div>
        TIME:
        <button>60</button>
        <button>90</button>
      </div>
      <div>
        BOARD SIZE:
        <div className="sizeButtons">
          <button disabled={start} onClick={handleFiveByFiveOnClick}>
            5x5
          </button>
          <button disabled={start} onClick={handleSevenBySevenOnClick}>
            7x7
          </button>
          <button disabled={start} onClick={handleTenByTenOnClick}>
            10x10
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
