import {SET_SIGN_UP_MODAL, SET_USER} from "./actions";

export const setSignUpModal = () => ({type: SET_SIGN_UP_MODAL})

export const setUser = (user) => ({type: SET_USER, payload: user})