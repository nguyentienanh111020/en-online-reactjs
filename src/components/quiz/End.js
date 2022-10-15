import React from "react";
import { useContext } from "react";
import { GameStateContext } from "./Contexts";

const End = () => {
  const { score, setScore, setGameState, numberQuestion } =
    useContext(GameStateContext);

  const restartQuiz = () => {
    setScore(0);
    setGameState("menu");
  };
  return (
    <div className="Menu">
      <h1>Quiz Finished</h1>
      <h1>
        {score}/{numberQuestion}
      </h1>
      <button className="btn-quiz" onClick={restartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default End;
