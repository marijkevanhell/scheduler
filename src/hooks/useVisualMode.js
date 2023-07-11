import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setMode(newMode);
      history.push(newMode);
    } else {
      setMode(newMode);
    }
  }

  function back() {
    if (history.length === 1) {
      return;
    }
    //gets 2nd to last element in history array to set new mode
    setMode(history[history.length - 2]);
    //makes new array exluding last element
    setHistory(history.slice(0, history.length - 1));
  }

  return { mode, transition, back };
}
