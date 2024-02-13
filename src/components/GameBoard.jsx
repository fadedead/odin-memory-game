import { useState } from "react";
import "../styles/gameBoard.css";
import { CardsPlayable } from "./CardsPlayable";

function GameBoard() {
  const [currScore, setScore] = useState(0);
  const [winCon, setWin] = useState("");

  if (winCon === "WON") {
    return (
      <div className="gameControl">
        <p>You win!!</p>
        <button
          onClick={() => {
            setWin("");
            setScore(0);
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  if (winCon === "LOST") {
    return (
      <div className="gameControl">
        <p>You Lose</p>
        <p>Score: {currScore}</p>
        <button
          onClick={() => {
            setWin("");
            setScore(0);
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="scoreBoard">Score: {currScore}</p>
      <CardsPlayable setScore={setScore} setWin={setWin} />
    </>
  );
}

export { GameBoard };
