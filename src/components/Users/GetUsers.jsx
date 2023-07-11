import React from 'react';
import axios from "axios";
import {useContext} from "react";
import {ApplicationContext} from "../../context/applicationContext";
import {setUsers} from "../../store/actionCreators";
import {useEffect} from "react";
import {SET_ERRORS_USERS, SET_IS_LOADING_USERS} from "../../store/actions";

const GetUsers = () => {
    const {state, dispatch} = useContext(ApplicationContext)

    useEffect(() => {
        try {
            async function getUsers() {
                dispatch({type: SET_IS_LOADING_USERS, payload: true})
                const response = await axios.get(`http://localhost:4000/users`, {
                    headers: {
                        Authorization: `Bearer ${state.userSession.access}`,
                    }
                });
                if (response.status === 200) {
                    dispatch(setUsers(response.data))
                }
            }

            getUsers()
        } catch (error) {
            dispatch({type: SET_ERRORS_USERS, payload: error.message});
        } finally {
            dispatch({type: SET_IS_LOADING_USERS, payload: false})
        }
    }, [])

    if (state.isLoadingUsers) {
        return <div>Loading...</div>
    }
    if (state.users && !state.isLoadingUsers) {
        return JSON.stringify(state.users)
    }
    if (state.errorsUsers) {
        return <div>{state.errorsUsers.message}</div>
    }

    return null;
};

export default GetUsers;