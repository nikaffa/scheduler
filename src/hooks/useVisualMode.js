//Custom hook, takes an initial argument to set the mode state, returns an object with a mode property
import { useState } from "react";

export default function useVisualMode(initial) {
  //sets the mode state with the initial mode
  const [mode, setMode] = useState(initial);
  //keeps track of the modes history
  const [history, setHistory] = useState([initial]);

  //takes in a new mode and updates the mode state with the new value
  const transition = function(mode, replace = false) {
    setMode(mode);

    //adds the new mode to the history array
    setHistory((prev) => {
      const newHistory = [...prev];
      if (replace === true) {
        newHistory.pop();
      }
      newHistory.push(mode);
      return newHistory;
    });
  };

  //allows us to go back to the previous mode
  const back = function() {
    if (history.length > 1) {

    //sets the mode to the previous item in the history array
    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    });
    setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
};