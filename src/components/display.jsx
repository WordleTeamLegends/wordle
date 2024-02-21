"use client";
import { useGameContext } from "@/context/game-context";

export default function Display() {
  let { display1_1 } = useGameContext();
  let { display1_2 } = useGameContext();
  let { display1_3 } = useGameContext();
  let { display1_4 } = useGameContext();
  let { display1_5 } = useGameContext();

  let { display1_1state } = useGameContext();
  let { display1_2state } = useGameContext();
  let { display1_3state } = useGameContext();
  let { display1_4state } = useGameContext();
  let { display1_5state } = useGameContext();

  let { display2_1 } = useGameContext();
  let { display2_2 } = useGameContext();
  let { display2_3 } = useGameContext();
  let { display2_4 } = useGameContext();
  let { display2_5 } = useGameContext();

  let { display2_1state } = useGameContext();
  let { display2_2state } = useGameContext();
  let { display2_3state } = useGameContext();
  let { display2_4state } = useGameContext();
  let { display2_5state } = useGameContext();

  return (
    <div>
      <div id="line">
        <p className={`display-box ${display1_1state}`}>{display1_1}</p>
        <p className={`display-box ${display1_2state}`}>{display1_2}</p>
        <p className={`display-box ${display1_3state}`}>{display1_3}</p>
        <p className={`display-box ${display1_4state}`}>{display1_4}</p>
        <p className={`display-box ${display1_5state}`}>{display1_5}</p>
      </div>
      <div id="line">
        <p className={`display-box ${display2_1state}`}>{display2_1}</p>
        <p className={`display-box ${display2_2state}`}>{display2_2}</p>
        <p className={`display-box ${display2_3state}`}>{display2_3}</p>
        <p className={`display-box ${display2_4state}`}>{display2_4}</p>
        <p className={`display-box ${display2_5state}`}>{display2_5}</p>
      </div>
    </div>
  );
}
