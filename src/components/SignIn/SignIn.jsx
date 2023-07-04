import React from 'react';
import classes from "../SignUp/SignUp.module.css";
import {useContext} from "react";
import {ApplicationContext} from "../../context/applicationContext";
import axios from "axios";
import {setUser} from "../../store/actionCreators";

const SignIn = () => {
    const {state, dispatch} = useContext(ApplicationContext)

    const userLogIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/signin', state.signUp);
            if (response.status === 201) {
                dispatch(setUser(response.data.user))
                dispatch({type: 'SET_USER_SESSION', payload: response.data.session});
                // getExistingSessions()
            }
        } catch (err) {
            console.error('Ошибка при отправке данных:', err);
            dispatch({type: 'SET_ERROR', payload: err.message});
        }
        finally {
            dispatch({type:'CLOSE_MODAL'})
        }
    };

    return (
        <div>
            <form className={classes.formContainer} onSubmit={userLogIn}>
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

export default SignIn;