import React from "react";

const Popup = ({ gameOver }) => {
  return gameOver ? <div className="gameOver">GAME OVER</div> : <div></div>;
};

export default Popup;
