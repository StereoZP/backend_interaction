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
        case ACTIONS.MODAL_CONTROLLER:
            return {
                ...state,
                signUpModal: action.payload.signUpModal,
                signInModal: action.payload.signInModal,
            }
        case ACTIONS.SET_USER_AUTH: {
            const {user, session} = action.payload;
            return {
                ...state,
                user,
                userSession: session
            }
        }
        case ACTIONS.SET_SESSIONS:{
            return {
                ...state,
                sessions:action.payload
            }
        }
        case ACTIONS.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state;
    }
}