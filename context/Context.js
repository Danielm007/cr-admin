import React, { createContext, useReducer } from "react";
import { Reducer } from "../reducers/reducer";

export const Context = createContext();
const initialState = {
  user: "",
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={(state, dispatch)}>
      <main className="container">{children}</main>
    </Context.Provider>
  );
};
