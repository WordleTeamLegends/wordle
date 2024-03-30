"use client";

/* ----- Third Party Imports ----- */
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

/* ----- Project Imports ----- */
import { checkDB, getTheWord, createGame, checkGame, gameEndQuery, updateDatabaseGuess } from "@/lib/checkDB";
import { getUserId } from "@/lib/users";
import * as Constants from "@/lib/constants";
import * as Tools from "@/lib/tools";

const GameContext = createContext();

export default function GameContextProvider({ children }) {
  const [currentGame, setCurrentGame] = useState(JSON.parse(JSON.stringify(Constants.currentGameObject)));
  const [currentRow, setCurrentRow] = useState(1);

  const [disabledButtons, setDisabledButtons] = useState([]);
  const [currentKeyboard, setCurrentKeyboard] = useState(JSON.parse(JSON.stringify(Constants.inititalStateKeyboard)));

  const [row1, setRow1] = useState(JSON.parse(JSON.stringify(Constants.initialStateDisplayRows)));
  const [row2, setRow2] = useState(JSON.parse(JSON.stringify(Constants.initialStateDisplayRows)));
  const [row3, setRow3] = useState(JSON.parse(JSON.stringify(Constants.initialStateDisplayRows)));
  const [row4, setRow4] = useState(JSON.parse(JSON.stringify(Constants.initialStateDisplayRows)));
  const [row5, setRow5] = useState(JSON.parse(JSON.stringify(Constants.initialStateDisplayRows)));
  const [row6, setRow6] = useState(JSON.parse(JSON.stringify(Constants.initialStateDisplayRows)));

  function endCurrentGame(result) {
    const copyCurrentGame = {...currentGame}
    copyCurrentGame.finished = true;
    copyCurrentGame.success = result;
    updateCurrentGame(copyCurrentGame);
    gameEndQuery(copyCurrentGame);
  }

  function changeColours(letterClass, row) {
    const copyRow = [...eval(`row${row}`)];
    letterClass.forEach((element, index) => {
      if (element === 0) {
        copyRow[index].class = "grey";
      } 
      else if (element === 1) {
        copyRow[index].class = "yellow";
      } 
      else if (element === 2) {
        copyRow[index].class = "green";
      }
    });
    eval(`setRow${row}(copyRow);`);
    changeKeyboard(copyRow);
  }

  //Need to make sure only one letter class pair here. 
  //Check for green in either - then else if yellow -- etc
  function changeKeyboard (row) {
    const copyKeyboard = [...currentKeyboard];
    row.forEach((item) => {
      for(let j = 0; j < 3; j ++) {
        const len = copyKeyboard[j].length;
        for (let k = 0; k < len; k++) {
          if( copyKeyboard[j][k].letter === item.value) {
            if (copyKeyboard[j][k].class === "green" || item.class === "green") {
              copyKeyboard[j][k].class = "green";
            }
            else if (copyKeyboard[j][k].class === "yellow" || item.class === "yellow") {
              copyKeyboard[j][k].class = "yellow";
            }
            else if (copyKeyboard[j][k].class === "grey" || item.class === "grey") {
              copyKeyboard[j][k].class = "grey";
            }
          }
        }
      }
    });
    setCurrentKeyboard(copyKeyboard);
  }

  function disableKeys(resultarray, guessarray, solutionarray) {
    resultarray.forEach((item, index) => {
      const isIncluded = solutionarray.includes(guessarray[index]);
      if (item === 0) {
        // check that the letter at this index isnt in the solution to prevent disabling 
        if (!isIncluded) {
          setDisabledButtons((prevButtons) => [...prevButtons, guessarray[index].toUpperCase()]);
        }
      }
      //runToast(disabledButtons);
    });
  }

  async function updateGuesses(guess, user) {
    //Update Game object first
    const copyGame = { ...currentGame };
    const newGuess = eval(`copyGame.guess${currentRow} = guess`);
    updateCurrentGame(copyGame);
    //Update Database
    updateDatabaseGuess(copyGame.id, guess, currentRow);
  }

  async function getGuess() {
    const currentRowArray = eval(`row${currentRow}`);
    if (currentRowArray[4].value !== "") {
      const guess = currentRowArray[0].value + currentRowArray[1].value + currentRowArray[2].value + currentRowArray[3].value + currentRowArray[4].value;
      const isAllowedGuess = await checkDB(guess);
      if (isAllowedGuess.rowCount > 0) {
        updateGuesses(guess, currentGame.user_id);

        const result = Tools.resultValidation(currentRowArray, currentGame.solution);

        //Function that changes the class values in the row - used by Display Component

        changeColours(result[0], currentRow);

        if (result[0][0] === 2 && result[0][1] === 2 && result[0][2] === 2 && result[0][3] === 2 && result[0][4] === 2) {
          endCurrentGame(true);
        } 
        else {
          disableKeys(result[0], result[1], result[2]);
          if (currentRow === 6) {
            endCurrentGame(false);
          } 
          else {
            setCurrentRow(currentRow + 1);
          }
        }
      } 
      else {
        runToast("NOT A VALID GUESS");
      }
    } 
    else {
      runToast("TYPE 5 LETTER WORD");
    }
  }

  function runToast(message) {
    toast.error(message);
  }

  async function startNewGame() {
    const copyCurrentGame = { ...Constants.currentGameObject };
    const user = await getUserId();
    const isGame = await checkGame(user);
    if (!isGame) {
      const solution = await getTheWord();
      const id = await createGame(solution, user);
      copyCurrentGame.solution = solution;
      copyCurrentGame.user_id = user;
      copyCurrentGame.id = id;
    } 
    else {
      let gameValues = {};
      if (isGame.rows[0]) {
        gameValues = isGame.rows[0];
        copyCurrentGame.id = gameValues.id;
        copyCurrentGame.user_id = gameValues.user_id;
        copyCurrentGame.game_start_time = gameValues.game_start_time;
        copyCurrentGame.solution = gameValues.solution;
        copyCurrentGame.current_guess = gameValues.current_guess;
        for (let i = 1; i <= gameValues.current_guess; i++) {
          eval(`copyCurrentGame.guess${i} = gameValues.guess${i}`);
          let guess = "";
          eval(`guess = gameValues.guess${i}`);

          if (guess) {
            setCurrentRow(i + 1);
            populateRows(i, guess, gameValues.solution);
          } 
          else {
            setCurrentRow(i);
          }
        }
        
      }
    }
    updateCurrentGame(copyCurrentGame);
  }

  function populateRows(row, guess, solution) {
    const copyRow = [...eval(`row${row}`)];
    for (let i = 0; i < 5; i++) {
      copyRow[i].value = guess.charAt(i);
    }
    copyRow.value = guess;
    eval(`setRow${row}(copyRow);`);
    const currentRowArray = eval(`row${row}`);
    const result = Tools.resultValidation(currentRowArray, solution);
    disableKeys(result[0], result[1], result[2]);
    changeColours(result[0], row);
  }

  function updateCurrentGame(copiedObject) {
    setCurrentGame({ ...currentGame, ...copiedObject });
  }

  function typeInLine(key) {
    const copyRow = [...eval(`row${currentRow}`)];
    if (copyRow[0].value === "") {
      copyRow[0].value = key;
    } 
    else if (copyRow[0].value !== "" && copyRow[1].value === "") {
      copyRow[1].value = key;
    } 
    else if (copyRow[0].value !== "" && copyRow[1].value !== "" && copyRow[2].value === "") {
      copyRow[2].value = key;
    } 
    else if (copyRow[0].value !== "" && copyRow[1].value !== "" && copyRow[2].value !== "" && copyRow[3].value === "") {
      copyRow[3].value = key;
    } 
    else if (copyRow[0].value !== "" && copyRow[1].value !== "" && copyRow[2].value !== "" && copyRow[3].value !== "" && copyRow[4].value === "") {
      copyRow[4].value = key;
    }
    eval(`setRow${currentRow}(copyRow);`);
  }

  function deleteLetter() {
    const copyRow = [...eval(`row${currentRow}`)];
    if (copyRow[4].value !== "") {
      copyRow[4].value = "";
    } 
    else if (copyRow[4].value === "" && copyRow[3].value !== "") {
      copyRow[3].value = "";
    } 
    else if (copyRow[4].value === "" && copyRow[3].value === "" && copyRow[2].value !== "") {
      copyRow[2].value = "";
    } 
    else if (copyRow[4].value === "" && copyRow[3].value === "" && copyRow[2].value === "" && copyRow[1].value !== "") {
      copyRow[1].value = "";
    } 
    else if (copyRow[4].value === "" && copyRow[3].value === "" && copyRow[2].value === "" && copyRow[1].value === "" && copyRow[0].value !== "") {
      copyRow[0].value = "";
    }
    eval(`setRow${currentRow}(copyRow);`);
  }

  function isButtonDisabled(letter) {
    return disabledButtons.includes(letter);
  }

  function manageInput(key) {
    if (key === "Enter") {
      Constants.deleteAllowed.value = false;
      if(Constants.enterAllowed.value) {
        getGuess();
      }
      setTimeout(() => {
        Constants.deleteAllowed.value = true;
      },1000);
    }
    else if( key === "Backspace" || key === "Delete") {
      Constants.enterAllowed.value = false;
      if(Constants.deleteAllowed.value) {
        deleteLetter();
      }
      setTimeout(() => {
        Constants.enterAllowed.value = true;
      },1000);
    }
    else if ( (key >= "a" && key <= "z") || ( key >= "A" && key <= "Z" ) ) {
      let letter = "";
      if ( key >= "a" && key <= "z") {
        letter = key.toUpperCase();
      }
      else if ( key >= "A" && key <= "Z") {
        letter = key;
      }
      if (!isButtonDisabled(letter)) {
        typeInLine(letter);
      }
    }
  }

  return (
    <GameContext.Provider
      value={{
        currentGame,
        manageInput,
        isButtonDisabled,
        startNewGame,
        currentKeyboard,
        row1,
        row2,
        row3,
        row4,
        row5,
        row6,
        runToast,
        disabledButtons,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
