"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { checkDB, getTheWord, createGame, checkGame } from "@/lib/checkDB";
import { getUserId } from "@/lib/users";
import toast from "react-hot-toast";

const GameContext = createContext();

export default function GameContextProvider({ children }) {
  let currentGameObject = {
    id: null,
    user_id: null,
    game_start_time: null,
    game_end_time: null,
    solution: null,
    guess_one: null,
    guess_two: null,
    guess_three: null,
    guess_four: null,
    guess_five: null,
    guess_six: null,
    duration: null,
    success: null,
    score: null,
  };

  const [currentGame, setCurrentGame] = useState(currentGameObject);

  const [currentLine, setCurrentLine] = useState("2");

  const [display1_1, setDisplay1_1] = useState("");
  const [display1_2, setDisplay1_2] = useState("");
  const [display1_3, setDisplay1_3] = useState("");
  const [display1_4, setDisplay1_4] = useState("");
  const [display1_5, setDisplay1_5] = useState("");

  const [display1_1state, setDisplay1_1state] = useState("default");
  const [display1_2state, setDisplay1_2state] = useState("default");
  const [display1_3state, setDisplay1_3state] = useState("default");
  const [display1_4state, setDisplay1_4state] = useState("default");
  const [display1_5state, setDisplay1_5state] = useState("default");

  const [display2_1, setDisplay2_1] = useState("");
  const [display2_2, setDisplay2_2] = useState("");
  const [display2_3, setDisplay2_3] = useState("");
  const [display2_4, setDisplay2_4] = useState("");
  const [display2_5, setDisplay2_5] = useState("");

  const [display2_1state, setDisplay2_1state] = useState("default");
  const [display2_2state, setDisplay2_2state] = useState("default");
  const [display2_3state, setDisplay2_3state] = useState("default");
  const [display2_4state, setDisplay2_4state] = useState("default");
  const [display2_5state, setDisplay2_5state] = useState("default");

  async function getGuess() {
    if (display1_5 !== "") {
      const guess = display1_1 + display1_2 + display1_3 + display1_4 + display1_5;
      //console.log("important string!", guess);
      const isAllowedGuess = await checkDB(guess);
      if (isAllowedGuess.rowCount > 0) {
        let solutionarray = currentGame.solution.split("");
        // MY CHANGES START HERE (EDUARDO)

        let guessarray = [
          display1_1.toLowerCase(),
          display1_2.toLowerCase(),
          display1_3.toLowerCase(),
          display1_4.toLowerCase(),
          display1_5.toLowerCase(),
        ]; // new from here
        let resultarray = new Array(5); // array of 5x5

        for (let i = 0; i < solutionarray.length; i++) {
          resultarray[i] = new Array(5); // Initialize each row of the matrix
          for (let j = 0; j < guessarray.length; j++) {
            // Compare elements and store the result in the comparison matrix
            resultarray[i][j] = solutionarray[i] === guessarray[j];
          }
        }
        // Log the comparison matrix to the console
        console.log(resultarray);

        // Initialize an array INLINE to store the sum of each column (check if "good")
        let columnSums = new Array(resultarray.length).fill(0);

        // Sum values in each column
        for (let j = 0; j < resultarray.length; j++) {
          // Iterate columns
          for (let i = 0; i < resultarray.length; i++) {
            // Iterate rows
            columnSums[j] += resultarray[i][j] ? 1 : 0; // Add 1 if true, 0 otherwise
          }
        }

        console.log("good:", columnSums);

        // Map results of i = j (main diagonal)(check if "perfect")
        const diagonalResults = resultarray.map((row, i) => row[i]);

        console.log("Perfect:", diagonalResults);

        // Sum the two matrices
        const sumMatrix = columnSums.map((element, index) => element + diagonalResults[index]);

        console.log(sumMatrix);
        [0, 0, 0, 0, 0];
        function changeColours() {
          // if (sumMatrix[0] === 0) {
          //   console.log(setDisplay1_1state("grey"));
          // } else if (sumMatrix[0] === 1) {
          //   console.log(setDisplay1_1state("yellow"));
          // } else if (sumMatrix[0] === 2) {
          //   console.log(setDisplay1_1state("green"));
          // }

          // sumMatrix.forEach((element, index) => {
          //   console.log(element, index);
          // });

          sumMatrix.forEach((element, index) => {
            if (element === 0) {
              eval(`setDisplay${index + 1}state("grey")`);
              console.log(index, "grey");
            } else if (element === 1) {
              eval(`setDisplay${index + 1}state("yellow")`);
              console.log(index, "yellow");
            } else if (element === 2) {
              eval(`setDisplay${index + 1}state("green")`);
              console.log(index, "green");
            }
          });
        }
        changeColours();

        // THIS IS THE END OF MY CHANGES (EDUARDO)

        console.log("It is a valid word but might not be correct");
      } else {
        console.log("Not a valid word");
      }

      console.log(isAllowedGuess);
    } else {
      // getTheWord();
      console.log("BAD BOY!");
      runToast("BAD BOY");
    }
  }

  function runToast(message) {
    toast.error(message);
  }

  async function startNewGame() {
    const user = await getUserId();
    const isGame = await checkGame(user);
    if (!isGame) {
      const solution = await getTheWord();
      console.log(solution, user);
      createGame(solution, user);
    } else {
      let gameValues = {};
      if (isGame.rows[0]) {
        gameValues = isGame.rows[0];
        const copyCurrentGame = { ...currentGameObject };
        copyCurrentGame.id = gameValues.id;
        copyCurrentGame.user_id = gameValues.user_id;
        copyCurrentGame.game_start_time = gameValues.game_start_time;
        copyCurrentGame.solution = gameValues.solution;
        updateCurrentGame(copyCurrentGame);
      }
    }
  }

  function updateCurrentGame(copiedObject) {
    setCurrentGame({ ...currentGame, ...copiedObject });
  }

  function typeInLine(key, currentLine) {
    if (`display${currentLine}_1 === ""`) {
      console.log("hey");
      // eval(`display${currentLine} === ""`);
      // setDisplay1_1(key);
      {
        eval(`setDisplay${currentLine}_1(key)`);
      }
      // } else if (display1_1 !== "" && display1_2 === "") {
      //   setDisplay1_2(key);
      // } else if (display1_1 !== "" && display1_2 !== "" && display1_3 === "") {
      //   setDisplay1_3(key);
      // } else if (display1_1 !== "" && display1_2 !== "" && display1_3 !== "" && display1_4 === "") {
      //   setDisplay1_4(key);
      // } else if (display1_1 !== "" && display1_2 !== "" && display1_3 !== "" && display1_4 !== "" && display1_5 === "") {
      //   setDisplay1_5(key);
    }
  }

  function deleteLetter() {
    if (display1_5 !== "") {
      setDisplay1_5("");
    } else if (display1_5 === "" && display1_4 !== "") {
      setDisplay1_4("");
    } else if (display1_5 === "" && display1_4 === "" && display1_3 !== "") {
      setDisplay1_3("");
    } else if (display1_5 === "" && display1_4 === "" && display1_3 === "" && display1_2 !== "") {
      setDisplay1_2("");
    } else if (display1_5 === "" && display1_4 === "" && display1_3 === "" && display1_2 === "" && display1_1 !== "") {
      setDisplay1_1("");
    }
  }

  return (
    <GameContext.Provider
      value={{
        currentGame,
        display1_1,
        display1_2,
        display1_3,
        display1_4,
        display1_5,
        display2_1,
        display2_2,
        display2_3,
        display2_4,
        display2_5,
        getGuess,
        typeInLine,
        startNewGame,
        deleteLetter,
        display1_1state,
        display1_2state,
        display1_3state,
        display1_4state,
        display1_5state,
        display2_1state,
        display2_2state,
        display2_3state,
        display2_4state,
        display2_5state,
        runToast,
        currentLine,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
