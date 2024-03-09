"use client";
/* ----- Third Party Imports ----- */
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

/* ----- Project Imports ----- */
import { useGameContext } from "@/context/game-context";

export default function Keyboard() {
  const { typeInLine, getGuess, deleteLetter, disabledButtons, currentKeyboard } = useGameContext();

  useEffect (() => {
    const handleKeyboard = (event) => {
      const pressedKey = event.key;
      if(pressedKey === "Enter") {
        getGuess();
      }
      else if(pressedKey === "Backspace") {
        deleteLetter();
      }
    }
    window.addEventListener("keydown", handleKeyboard);
    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    }
  }, [getGuess, deleteLetter]);

  function isButtonDisabled(key) {
    return disabledButtons.includes(key);
  }

  function assignClass(key) {
    if (isButtonDisabled(key)) {
      return "disabled";
    } else {
      return;
    }
  }

  return (
    <div id="keyboard-container">
      <Toaster />
      {
        currentKeyboard.map((row, index) => {
          return (
            <div key={`${index} row`} className="keys-row">
              {
                row.map((item) => {
                  return (
                    <button 
                    key={item.key}
                    value={item.key}
                    disabled={isButtonDisabled(item.key)}
                    className={assignClass(item.key)}
                    onClick={() => {
                      typeInLine(item.key);
                    }}
                  >
                    {item.key}
                  </button>
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
}
