import { useState } from "react";

// Simple query string state manager
const useQsState = (initialState) => {
  const [state, setState] = useState(initialState);

  const setQueryString = (newState) => {
    const newQuery = { ...state, ...newState };
    // Update URL without reload
    window.history.replaceState(
      null,
      "",
      `?${new URLSearchParams(newQuery).toString()}`
    );
    setState(newQuery);
  };

  return [state, setQueryString];
};

export default useQsState;
