import React from "react";

function Input({ getGuess, disabled }) {
  const [inputVal, setInputVal] = React.useState("");
  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        getGuess(inputVal);
        setInputVal("");
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={inputVal}
        disabled={disabled}
        pattern="[A-Za-z\s]{5,5}"
        onChange={(e) => {
          setInputVal(e.target.value.toUpperCase());
        }}
      />
    </form>
  );
}

export default Input;
