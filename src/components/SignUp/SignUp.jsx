import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../context/applicationContext";
import axios from "axios";

const SignUp = () => {
    const {state, dispatch} = useContext(ApplicationContext)

    async function getExistingSessions() {
        try {
            const response = await axios.get('http://localhost:4000/auth/existing-sessions', {
                headers: {
                    Authorization: `Bearer ${state.userSession.access}`,
                },
            });
            if (response.status === 200) {
                // dispatch({type: 'SET_USER_SESSION', payload: response.data});
                console.log(response.data.userAgent)
            }
            // console.log('Информация о существующих сеансах:', response.data);
            // return response.data;
        } catch (error) {
            console.error('Ошибка при получении информации о существующих сеансах:', error);
        }
    }

    const userSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/signup', state.signUp);
            if (response.status === 201) {
                dispatch({type: 'SET_USER', payload: response.data.user})
                dispatch({type: 'SET_USER_SESSION', payload: response.data.session});
                getExistingSessions()
            }
        } catch (err) {
            console.error('Ошибка при отправке данных:', err);
            dispatch({type: 'SET_ERROR', payload: err.message});
        }
    };
    return (
        <div>
            <form onSubmit={userSubmit}>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={state.signUp.email}
                    onChange={(e) => {
                        dispatch({type: 'SET_SIGN_UP', payload: {...state.signUp, email: e.target.value}})
                    }}
                />
                <label>Login</label>
                <input
                    type="text"
                    name="login"
                    value={state.signUp.login}
                    onChange={(e) => {
                        dispatch({type: 'SET_SIGN_UP', payload: {...state.signUp, login: e.target.value}})
                    }}
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={state.signUp.password}
                    onChange={(e) => {
                        dispatch({type: 'SET_SIGN_UP', payload: {...state.signUp, password: e.target.value}})
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignUp;