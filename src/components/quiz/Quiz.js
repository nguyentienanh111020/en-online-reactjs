import { useState, useEffect } from "react";
import { useContext } from "react";
import { GameStateContext } from "./Contexts";
import "./Quiz.css";

function Quiz() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      "https://enonline-9f93c-default-rtdb.asia-southeast1.firebasedatabase.app/questions.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const { score, setScore, gameState, setGameState, setNumberQuestion } =
    useContext(GameStateContext);

  const chooseOption = (option) => {
    setOptionChosen(option);
    console.log(option);

    let buttons = document.querySelectorAll(".btn-quiz");
    buttons.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.add("active");

        for (let i = 0; i < 4; i++) {
          buttons[i].classList.add("disable");
        }
      });
    });
  };

  const finished = () => {
    setGameState("finished");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {Array(items[currentQuestion]).map((item) => (
          <div className="Menu">
            <h3>
              Question {currentQuestion + 1} of {items.length}
            </h3>
            <h2 style={{ paddingBottom: "20px" }}>{item.prompt}</h2>
            <div className="questions">
              <button
                className="btn-quiz"
                onClick={() => {
                  chooseOption("optionA");
                }}
              >
                A. {item.optionA}
              </button>
              <button
                className="btn-quiz"
                onClick={() => {
                  chooseOption("optionB");
                }}
              >
                B. {item.optionB}
              </button>
              <button
                className="btn-quiz"
                onClick={() => {
                  chooseOption("optionC");
                }}
              >
                C. {item.optionC}
              </button>
              <button
                className="btn-quiz"
                onClick={() => {
                  chooseOption("optionD");
                }}
              >
                D. {item.optionD}
              </button>
            </div>

            {currentQuestion == items.length - 1 ? (
              <button
                className="btn-quiz"
                onClick={function () {
                  if (item.answer == optionChosen) {
                    setScore(score + 1);
                  }
                  setGameState("finished");
                  setNumberQuestion(items.length);
                }}
                id="nextQuestion"
              >
                Finish Quiz
              </button>
            ) : (
              <button
                className="btn-quiz"
                onClick={function () {
                  if (item.answer == optionChosen) {
                    setScore(score + 1);
                  }
                  setCurrentQuestion(currentQuestion + 1);
                  let buttons = document.querySelectorAll(".btn-quiz");
                  for (let i = 0; i < 5; i++) {
                    buttons[i].classList.remove("disable");
                    buttons[i].classList.remove("active");
                  }
                }}
                id="nextQuestion"
              >
                Next Question
              </button>
            )}
          </div>
        ))}
      </ul>
    );
  }
}

export default Quiz;
