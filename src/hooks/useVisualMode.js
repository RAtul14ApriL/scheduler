import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    setMode(newMode);
    if (replace === false) {
      history.push(newMode);
    }
  };

  const back = function () {
    if(history.length === 1) {
      setMode(history[0]);
    } else {
      history.pop();
      setMode(history.slice(-1).toString());
    }
  };

  return { mode, transition, back, history };
};