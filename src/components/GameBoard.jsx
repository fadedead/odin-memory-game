import { useState } from "react";
import "../styles/gameBoard.css";
import { CardsPlayable } from "./CardsPlayable";

function GameBoard() {
  const [currScore, setScore] = useState(0);

  return (
    <>
      <CardsPlayable setScore={setScore} />
      <p>{currScore}</p>
    </>
  );
}

export { GameBoard };
