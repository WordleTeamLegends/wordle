export const initialStateDisplayRows = [
  {
    value: "",
    class: "default",
  },
  {
    value: "",
    class: "default",
  },
  {
    value: "",
    class: "default",
  },
  {
    value: "",
    class: "default",
  },
  {
    value: "",
    class: "default",
  },
];

export const currentGameObject = {
  id: null,
  user_id: null,
  game_start_time: null,
  game_end_time: null,
  solution: null,
  guess1: null,
  guess2: null,
  guess3: null,
  guess4: null,
  guess5: null,
  guess6: null,
  duration: null,
  success: false,
  finished: false,
  current_guess: 1,
  score: null,
};

export const inititalStateKeyboard = [
  [{letter: "Q", class: "default" }, {letter: "W", class: "default" },{letter: "E", class: "default" },{letter: "R", class: "default" },{letter: "T", class: "default" },{letter: "Y", class: "default" },{letter: "U", class: "default" },{letter: "I", class: "default" },{letter:  "O", class: "default" },{letter: "P", class: "default" }],
  [{letter: "A", class: "default" },{letter: "S", class: "default" },{letter: "D", class: "default" },{letter: "F", class: "default" },{letter: "G", class: "default" },{letter: "H", class: "default" },{letter: "J", class: "default" },{letter: "K", class: "default" },{letter: "L", class: "default" }],
  [{letter: "Enter", class: "enter-button" },{letter: "Z", class: "default" },{letter: "X", class: "default" },{letter: "C", class: "default" },{letter: "V", class: "default" },{letter: "B", class: "default" },{letter: "N", class: "default" },{letter: "M", class: "default" },{letter: "Delete", class: "del-button" }],
];
