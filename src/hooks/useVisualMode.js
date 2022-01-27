import { useState } from 'react';

const useVisualMode = (initial) => {

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const newHistory = [...history];
    if (replace === true) {
      newHistory.pop();
    }
    newHistory.push(newMode);
    setHistory(newHistory);
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
    }
  }
  const mode = history.slice(-1)[0];
  return { mode, transition, back, history };
};

export default useVisualMode;