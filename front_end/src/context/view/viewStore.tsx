import React, { createContext, Dispatch, Reducer, useReducer } from "react";
import * as Cookies from "../../utils/cookiesUtils";

export const DARK_THEME = "DARK_THEME";
export const LIGHT_THEME = "LIGHT_THEME";

export const Types = {
  UPDATE_VIEW: "UPDATE_VIEW"
};

export interface IViewContextState {
  mobile: boolean;
  theme: "DARK_THEME" | "LIGHT_THEME";
}

export interface IViewContextAction {
  actionType: string;
  mobile: boolean;
  theme: "DARK_THEME" | "LIGHT_THEME";
}

export interface IContextProps {
  state: IViewContextState;
  dispatch: Dispatch<IViewContextAction>;
}

export const ViewContext = createContext<IContextProps>({} as IContextProps);

const reducer: Reducer<IViewContextState, IViewContextAction> = (
  state: IViewContextState,
  action: IViewContextAction
): IViewContextState => {
  const { mobile, theme, actionType } = action;

  switch (actionType) {
    case Types.UPDATE_VIEW:
      Cookies.setTheme(theme);
      return { mobile, theme };

    default:
      throw new Error("Action type must be defined");
  }
};

const initialState: IViewContextState = {
  mobile: false,
  theme: Cookies.getTheme() || DARK_THEME
};

export const ViewStore: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ViewContext.Provider value={{ state, dispatch }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = (): IContextProps =>
  React.useContext(ViewContext);
