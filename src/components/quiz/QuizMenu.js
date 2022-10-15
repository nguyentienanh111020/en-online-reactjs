import "./Quiz.css";
import Menu from "./MainMenu";
import Quiz from "./Quiz";
import End from "./End";
import { useState } from "react";
import { GameStateContext } from "./Contexts";

function QuizMenu() {
  const [gameState, setGameState] = useState("menu");
  const [score, setScore] = useState(0);
  const [numberQuestion, setNumberQuestion] = useState("");

  return (
    <div className="quizapp">
      <h1>Vocabulary Quiz</h1>
      <br />
      <GameStateContext.Provider
        value={{
          gameState,
          setGameState,
          score,
          setScore,
          numberQuestion,
          setNumberQuestion,
        }}
      >
        {gameState === "menu" && <Menu />}
        {gameState === "playing" && <Quiz />}
        {gameState === "finished" && <End />}
      </GameStateContext.Provider>
    </div>
  );
}

export default QuizMenu;
