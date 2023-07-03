import * as ACTIONS from "./actions";

export function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_SIGN_UP:
            return {...state, signUp: action.payload};
        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload,
                error: null
            };
        case ACTIONS.SET_USER_SESSION:
            return {
                ...state,
                userSession: action.payload,
            };
        case ACTIONS.SET_ERROR:
            return {
                ...state,
                user: null,
                error: action.payload
            };
        case ACTIONS.SET_SIGN_IN_MODAL:
            return {...state, signInModal: action.payload};
        case ACTIONS.OPEN_SIGN_IN_MODAL:
            return {
                ...state,
                signInModal: true,
            }
        case ACTIONS.SET_SIGN_UP_MODAL:
            return {...state, signUpModal: action.payload};
        case ACTIONS.OPEN_SIGN_UP_MODAL:
            return {
                ...state,
                signUpModal: true,
            }
        case ACTIONS.CLOSE_MODAL:
            return {
                ...state,
                signUpModal: false,
                signInModal: false,
            }
        default:
            return state;
    }
}