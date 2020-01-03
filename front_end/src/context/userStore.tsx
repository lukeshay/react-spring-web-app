import React, { createContext, useReducer } from "react";
import { User } from "../types";
import Types from "./userActionTypes";

export interface IUserContextState {
  user: User | null;
}

export const StoreContext = createContext<IUserContextState>({ user: null });

export interface IUserContextAction {
  actionType: string;
  user: User;
}

const initialState: IUserContextState = {
  user: null
};

const reducer = (state: IUserContextState, action: IUserContextAction) => {
  switch (action.actionType) {
    case Types.SIGN_IN:
      return { user: action.user };

    case Types.SIGN_OUT:
      return { user: null };

    case Types.UPDATE_USER:
      return { user: action.user };

    default:
      throw new Error("Action type must be defined");
  }
};

const UserStore: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};
