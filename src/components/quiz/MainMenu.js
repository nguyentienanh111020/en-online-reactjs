import { useContext } from "react";
import { GameStateContext } from "./Contexts";

function MainMenu() {
  const { gameState, setGameState } = useContext(GameStateContext);
  return (
    <div className="Menu">
      <button
        className="btn-quiz"
        onClick={() => {
          setGameState("playing");
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default MainMenu;
