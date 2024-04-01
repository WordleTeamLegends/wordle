"use client";
/* ----- Third Party Imports ----- */

/* ----- Project Imports ----- */
import { useGameContext } from "@/context/game-context";

export default function Display() {

  const { currentDisplay } = useGameContext();

  return (
    <section className = "displayContainer">
      {currentDisplay.map((row, outerIndex) => {
        return (
          <div key={`currentDisplayRow + ${outerIndex}`} className="line">
            {row.map((object, index) => {
              return (
                <div key={`row + ${outerIndex} + ${object.class} + ${index}`}>
                  <p className={`display-box ${object.class}`}>{object.value}</p>
                </div>
              );
            })}
          </div>
        )
      })}
    </section>
  );
}
