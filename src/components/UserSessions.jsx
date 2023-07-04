import axios from "axios";
import {useContext, useEffect} from "react";
import {ApplicationContext} from "../context/applicationContext";
import {SET_ERROR, SET_IS_LOADING, SET_SESSIONS} from "../store/actions";

export const UserSessions = (props) => {
    const {state, dispatch} = useContext(ApplicationContext)

    async function getExistingSessions() {
        try {
            dispatch({type: SET_IS_LOADING, payload: true})
            const response = await axios.get('http://localhost:4000/auth/existing-sessions', {
                headers: {
                    Authorization: `Bearer ${state.userSession.access}`,
                },
            });
            if (response.status === 200) {
                dispatch({type: SET_SESSIONS, payload: response.data});
            }
        } catch (error) {
            dispatch({type: SET_ERROR, payload: error.message});
        } finally {
            dispatch({type: SET_IS_LOADING, payload: false})
        }
    }

    useEffect(() => getExistingSessions(), [])

    if (state.isLoading) {
        return <div>Loading...</div>
    }
    if (state.sessions && !state.isLoading) {
        return JSON.stringify(state.sessions)
    }
    if (state.error){
        return <div>{state.error.message}</div>
    }

    //добавить для каждой загрузки свой лоадинг и ерору
    //вівести инфу о юзере
    //создать форму добавления лота(Formik)
    // все формі на Formik

    return null;
}