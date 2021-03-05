import React from "react";

const Options = ({ time, setName }) => {
  const handleOnInputChange = e => {
    setName(e.target.value);
  };

  return (
    <div className="options">
      options
      <div>
        NAME: <input onChange={handleOnInputChange} type="text" maxLength="10"></input>
      </div>
      <div>TIME: {time}</div>
      <div>DIFFICULTY: NORMAL</div>
      <div>BOARD SIZE: 25x25</div>
    </div>
  );
};

export default Options;
