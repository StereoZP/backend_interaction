import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../context/applicationContext";
import {SET_ERRORS_EXISTING_SESSIONS, SET_IS_LOADING_EXISTING_SESSIONS, SET_SESSIONS} from "../../store/actions";
import axios from "axios";

const DeleteSession = () => {
    const {state, dispatch} = useContext(ApplicationContext)

    async function deleteExistingSession() {

        try {
                dispatch({type: SET_IS_LOADING_EXISTING_SESSIONS, payload: true})
                const response = await axios.delete(`http://localhost:4000/auth/existing-sessions/${state.userSession.id}`, {
                    headers: {
                        Authorization: `Bearer ${state.userSession.access}`,
                    }}
            );
                if (response.status === 200) {
                    dispatch({type: SET_SESSIONS, payload: response.data});
                }
        } catch (error) {
            dispatch({type: SET_ERRORS_EXISTING_SESSIONS, payload: error.message});
        } finally {
            dispatch({type: SET_IS_LOADING_EXISTING_SESSIONS, payload: false})
        }
    }

    return (
        <div>
            <button onClick={deleteExistingSession}>deleteExistingSession</button>
        </div>
    )
};

export default DeleteSession;