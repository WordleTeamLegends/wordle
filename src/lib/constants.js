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
  [{key: "Q"}, {key: "W"},{key: "E"},{key: "R"},{key: "T"},{key: "Y"},{key: "U"},{key: "I"},{key:  "O"},{key: "P"}],
  [{key: "A"},{key: "S"},{key: "D"},{key: "F"},{key: "G"},{key: "H"},{key: "J"},{key: "K"},{key: "L"}],
  [{key: "Enter"},{key: "Z"},{key: "X"},{key: "C"},{key: "V"},{key: "B"},{key: "N"},{key: "M"},{key: "Delete"}],
];