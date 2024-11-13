import React from 'react'
import type { Dispatch, ReactNode } from 'react';
import { createContext, useEffect, useReducer } from 'react';
import type { KOL, KolsActions } from './reducers';
import { kolsReducer, Types } from "./reducers";

type InitialStateType = {
  kols: KOL[];
}

const initialState = {
  kols: [],
}

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<KolsActions>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ kols }: InitialStateType, action: KolsActions) => ({
  kols: kolsReducer(kols, action),
});


const AppProvider = ({ children } : { children: ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    const kols = JSON.parse(localStorage.getItem("kols-cart") ?? "[]") as KOL[];
    dispatch({
      type: Types.SetKols,
      payload: kols,
    })
  }, []);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext };
