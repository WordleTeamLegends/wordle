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
  [{key: "Q", class: "default" }, {key: "W", class: "default" },{key: "E", class: "default" },{key: "R", class: "default" },{key: "T", class: "default" },{key: "Y", class: "default" },{key: "U", class: "default" },{key: "I", class: "default" },{key:  "O", class: "default" },{key: "P", class: "default" }],
  [{key: "A", class: "default" },{key: "S", class: "default" },{key: "D", class: "default" },{key: "F", class: "default" },{key: "G", class: "default" },{key: "H", class: "default" },{key: "J", class: "default" },{key: "K", class: "default" },{key: "L", class: "default" }],
  [{key: "Enter", class: "enter-button" },{key: "Z", class: "default" },{key: "X", class: "default" },{key: "C", class: "default" },{key: "V", class: "default" },{key: "B", class: "default" },{key: "N", class: "default" },{key: "M", class: "default" },{key: "Delete", class: "del-button" }],
];
