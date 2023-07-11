import axios from "axios";
import {useContext, useEffect} from "react";
import {ApplicationContext} from "../../context/applicationContext";
import {
    SET_ERRORS_EXISTING_SESSIONS,
    SET_IS_LOADING_EXISTING_SESSIONS,
    SET_SESSIONS
} from "../../store/actions";

export const UserSessions = (props) => {
    const {state, dispatch} = useContext(ApplicationContext)

    useEffect(() => {
        try {
            async function getExistingSessions() {
                dispatch({type: SET_IS_LOADING_EXISTING_SESSIONS, payload: true})
                const response = await axios.get(`http://localhost:4000/auth/existing-sessions`, {
                    headers: {
                        Authorization: `Bearer ${state.userSession.access}`,
                    },
                });
                if (response.status === 200) {
                    dispatch({type: SET_SESSIONS, payload: response.data});
                }
            }
            getExistingSessions()
        } catch (error) {
            dispatch({type: SET_ERRORS_EXISTING_SESSIONS, payload: error.message});
        } finally {
            dispatch({type: SET_IS_LOADING_EXISTING_SESSIONS, payload: false})
        }
    }, [])

    if (state.isLoadingExistingSessions) {
        return <div>Loading...</div>
    }
    if (state.sessions && !state.isLoadingExistingSessions) {
        return JSON.stringify(state.sessions)
    }
    if (state.errorsExistingSessions) {
        return <div>{state.errorsExistingSessions.message}</div>
    }

    //создать форму добавления лота(Formik)

    return null;
}