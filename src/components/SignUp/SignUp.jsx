import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../context/applicationContext";
import axios from "axios";
import classes from "./SignUp.module.css";

const SignUp = () => {
    const {state, dispatch} = useContext(ApplicationContext)

    const userSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/signup', state.signUp);
            if (response.status === 201) {
                dispatch({type: 'SET_USER_AUTH', payload: response.data});
            }
        } catch (err) {
            console.error('Ошибка при отправке данных:', err);
            dispatch({type: 'SET_ERROR', payload: err.message});
        } finally {
            dispatch({type: 'CLOSE_MODAL'})
        }
    };

    return (
        <div>
            <form className={classes.formContainer} onSubmit={userSubmit}>
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