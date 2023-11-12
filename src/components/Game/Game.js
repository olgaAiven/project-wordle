import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import Input from "../Input";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";
// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState("live");
  const allowedNumGuesses = range(0, NUM_OF_GUESSES_ALLOWED);
  const guessLenght = range(0, 5);

  function getGuess(guess) {
    const newArr = guesses.concat(guess);

    const isGuessCorrect = checkGuess(guess, answer).every((item) => {
      return item.status === "correct";
    });

    setGuesses(newArr);
    if (isGuessCorrect && newArr.length <= 6) {
      setGameStatus("win");
    }

    if (newArr.length === 6 && !isGuessCorrect) {
      setGameStatus("lose");
    }
  }

  const renderGuessLine = (guess, key) => {
    if (!guess) return null;
    return (
      <p className="guess" key={key}>
        {guessLenght.map((item) => {
          const { letter, status } = [...checkGuess(guess, answer)][item];
          return (
            <span
              key={item}
              className={letter === " " ? "cell" : `cell ${status}`}
            >
              {letter}
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <>
      <div className="game-wrapper">
        <div className="guess-results">
          {allowedNumGuesses.map((item) => {
            return renderGuessLine(guesses[item], item);
          })}
        </div>
      </div>
      <Input
        getGuess={getGuess}
        disabled={gameStatus === "win" || gameStatus === "lose"}
      />
      {gameStatus !== "live" && (
        <div className={gameStatus === "win" ? "happy banner" : "sad banner"}>
          {gameStatus === "win" ? (
            <p>
              <strong>Congratulations!</strong> Got it in
              <strong>{`${
                guesses.findIndex((guess) => {
                  return guess === answer;
                }) + 1
              } guess${
                guesses.findIndex((guess) => {
                  return guess === answer;
                }) +
                  1 <
                2
                  ? ""
                  : "es"
              }`}</strong>
              .
            </p>
          ) : (
            <p>
              Sorry, the correct answer is <strong>{answer}</strong>.
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Game;
