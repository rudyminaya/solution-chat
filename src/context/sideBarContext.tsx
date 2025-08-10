'use client'
import React, { createContext, useContext, useReducer, ReactNode } from "react";

type State = {
  isOpen: boolean;
};

type Action = { type: "TOGGLE_SIDEBAR" };

const initialState: State = {
  isOpen: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

type SideBarContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SideBarContext.Provider value={{ state, dispatch }}>
      {children}
    </SideBarContext.Provider>
  );
};