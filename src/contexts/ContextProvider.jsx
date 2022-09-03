import React, { createContext, useContext } from "react";

const StateContext = createContext();

export const tempUrl = "http://localhost:8000";

export const ContextProvider = ({ children }) => {
  return <StateContext.Provider>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
