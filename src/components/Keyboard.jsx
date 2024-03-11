"use client";
/* ----- Third Party Imports ----- */
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

/* ----- Project Imports ----- */
import { useGameContext } from "@/context/game-context";

export default function Keyboard() {
  const { isButtonDisabled, currentKeyboard, manageInput } = useGameContext();

  useEffect (() => {
    const handleKeyboard = (event) => {
      const pressedKey = event.key;
      manageInput(pressedKey);
    }
    window.addEventListener("keydown", handleKeyboard);
    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    }
  }, [manageInput]);

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
                    className={item.class}
                    onClick={() => {
                      manageInput(item.key);
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
