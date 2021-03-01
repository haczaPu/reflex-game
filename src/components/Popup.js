import React from "react";

const Popup = ({ gameOver }) => {
  return gameOver ? <div className="gameOver">Game over</div> : <div></div>;
};

export default Popup;
