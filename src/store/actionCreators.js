import {SET_SIGN_UP_MODAL, SET_SIGN_IN_MODAL, SET_USER, SET_USERS} from "./actions";

export const setSignUpModal = () => ({type: SET_SIGN_UP_MODAL})
export const setSignInModal = () => ({type: SET_SIGN_IN_MODAL})

export const setUser = (user) => ({type: SET_USER, payload: user})
export const setUsers = (users) => ({type: SET_USERS, payload: users})