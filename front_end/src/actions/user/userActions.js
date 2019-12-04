import dispatcher from "../../appDispatcher";
import actionTypes from "./userActionTypes";

export const signOut = async () => {
    dispatcher.dispatch({
        actionType: actionTypes.SIGN_OUT
    });
};

export const signIn = async _user => {
    dispatcher.dispatch({
        actionType: actionTypes.SIGN_IN,
        user: _user
    });
};
