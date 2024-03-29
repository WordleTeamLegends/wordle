"use client";
/* ----- Third Party Imports ----- */

/* ----- Project Imports ----- */
import { useGameContext } from "@/context/game-context";

export default function Display() {

  const { row1, row2, row3, row4, row5, row6 } = useGameContext();

  return (
    <div>
      <div className="line">
        {row1.map((object, index) => {
          return (
            <div key={`row1 + ${object.value} + ${object.class} + ${index}`}>
              <p className={`display-box ${object.class}`}>{object.value}</p>
            </div>
          );
        })}
      </div>
      <div className="line">
        {row2.map((object, index) => {
          return (
            <div key={`row2 + ${object.value} + ${object.class} + ${index}`}>
              <p className={`display-box ${object.class}`}>{object.value}</p>
            </div>
          );
        })}
      </div>
      <div className="line">
        {row3.map((object, index) => {
          return (
            <div key={`row3 + ${object.value} + ${object.class} + ${index}`}>
              <p className={`display-box ${object.class}`}>{object.value}</p>
            </div>
          );
        })}
      </div>
      <div className="line">
        {row4.map((object, index) => {
          return (
            <div key={`row4 + ${object.value} + ${object.class} + ${index}`}>
              <p className={`display-box ${object.class}`}>{object.value}</p>
            </div>
          );
        })}
      </div>
      <div className="line">
        {row5.map((object, index) => {
          return (
            <div key={`row5 + ${object.value} + ${object.class} + ${index}`}>
              <p className={`display-box ${object.class}`}>{object.value}</p>
            </div>
          );
        })}
      </div>
      <div className="line">
        {row6.map((object, index) => {
          return (
            <div key={`row6 + ${object.value} + ${object.class} + ${index}`}>
              <p className={`display-box ${object.class}`}>{object.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
