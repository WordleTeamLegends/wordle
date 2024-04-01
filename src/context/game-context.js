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
  const [currentRow, setCurrentRow] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [currentKeyboard, setCurrentKeyboard] = useState(JSON.parse(JSON.stringify(Constants.inititalStateKeyboard)));
  const [currentDisplay, setCurrentDisplay] = useState(Tools.createDisplayObject());

  function endCurrentGame(result) {
    const copyCurrentGame = {...currentGame}
    copyCurrentGame.finished = true;
    copyCurrentGame.success = result;
    updateCurrentGame(copyCurrentGame);
    gameEndQuery(copyCurrentGame);
  }

  function changeColours(letterClass, row) {
    const copyDisplay = [...currentDisplay]
    letterClass.forEach((element, index) => {
      if (element === 0) {
        currentDisplay[row][index].class = "grey";
      } 
      else if (element === 1) {
        currentDisplay[row][index].class = "yellow";
      } 
      else if (element === 2) {
        currentDisplay[row][index].class = "green";
      }
    });
    setCurrentDisplay(copyDisplay);
    changeKeyboard(copyDisplay[row]);
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

  async function updateGuesses(guess) {
    //Update Game object first
    const copyGame = { ...currentGame };
    const newGuess = eval(`copyGame.guess${currentRow} = guess`);
    updateCurrentGame(copyGame);
    //Update Database
    updateDatabaseGuess(copyGame.id, guess, currentRow);
  }

  async function getGuess() {
    let guess = "";
    for (let i = 0; i <= 4; i++ ) {
      guess += currentDisplay[currentRow][i].value.toString();
    }
    const isAllowedGuess = await checkDB(guess)
    if (isAllowedGuess.rowCount > 0) {
      updateGuesses(guess, currentGame.user_id);
      const result = Tools.validateGuess(currentDisplay[currentRow], currentGame.solution);
      changeColours(result[0], currentRow)
      if (result[0][0] === 2 && result[0][1] === 2 && result[0][2] === 2 && result[0][3] === 2 && result[0][4] === 2) {
        endCurrentGame(true);
      } 
      else {
        disableKeys(result[0], result[1], result[2]);
        if (currentRow === 5) {
          endCurrentGame(false);
        } 
        else {
          setCurrentRow(currentRow + 1);
          setCurrentIndex(0);
        }
      }
    }
    else {
      runToast("NOT A VALID GUESS");
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
        for (let i = 0; i <= gameValues.current_guess; i++) {
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
    const copyDisplay = [...currentDisplay];
    for (let i = 0; i < 5; i++) {
      copyDisplay[row][i].value = guess.charAt(i);
    }
    setCurrentDisplay(copyDisplay);
    const result = Tools.validateGuess(copyDisplay[row], solution);
    disableKeys(result[0], result[1], result[2]);
    changeColours(result[0], row);
  }

  function updateCurrentGame(copiedObject) {
    setCurrentGame({ ...currentGame, ...copiedObject });
  }

  function typeInLine(key) {
    const copyDisplay = [...currentDisplay]
    copyDisplay[currentRow][currentIndex].value = key;
    setCurrentDisplay(copyDisplay);
    setCurrentIndex(currentIndex => currentIndex + 1);
  }

  function deleteLetter() {
    const copyDisplay = [...currentDisplay]
    copyDisplay[currentRow][currentIndex - 1].value = "";
    setCurrentDisplay(copyDisplay);
    setCurrentIndex(currentIndex => currentIndex - 1);
  }

  function isButtonDisabled(letter) {
    return disabledButtons.includes(letter);
  }

  function manageInput(key) {
    if( (key === "Backspace" || key === "Delete") && currentIndex != 0) {
      if(!Tools.isGuessLoading.value) {
        deleteLetter();
      }
    }
    else if ( key.length == 1 && ((key >= "a" && key <= "z") || ( key >= "A" && key <= "Z" )) ) {
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
    else if (key === "Enter" && currentIndex === 5) {
      Tools.isGuessLoading.value = true;
      getGuess().finally(() => {
        Tools.isGuessLoading.value = false;
      });
    }
    else {
      runToast(`Incorrect use of ${key}`);
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
        currentDisplay,
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
