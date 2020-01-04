import React, { createContext, Dispatch, Reducer, useReducer } from "react";
import { Gym } from "../../types";
import Types from "./gymsActionTypes";

export interface IGymsContextState {
  gyms: Gym[];
}

export interface IGymsContextAction {
  actionType: string;
  gyms: Gym[];
  gym?: Gym;
}

export interface IContextProps {
  state: IGymsContextState;
  dispatch: Dispatch<IGymsContextAction>;
}

export const GymsContext = createContext<IContextProps>({} as IContextProps);

const reducer: Reducer<IGymsContextState, IGymsContextAction> = (
  state: IGymsContextState,
  action: IGymsContextAction
): IGymsContextState => {
  switch (action.actionType) {
    case Types.LOAD_GYMS:
      return { gyms: action.gyms };

    case Types.UPDATE_GYM:
      if (!action.gym) {
        throw new Error("Action must have a gym.");
      } else {
        return {
          gyms: state.gyms.map(
            (gym: Gym): Gym => (gym.id === action.gym.id ? action.gym : gym)
          )
        };
      }

    default:
      throw new Error("Action type must be defined");
  }
};

const initialState: IGymsContextState = {
  gyms: Array<Gym>()
};

export const GymsStore: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GymsContext.Provider value={{ state, dispatch }}>
      {children}
    </GymsContext.Provider>
  );
};
