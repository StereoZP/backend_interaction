import React from 'react';
import classes from "../SignUp/SignUp.module.css";
import cl from "./SignIn.module.css"
import {useContext} from "react";
import {ApplicationContext} from "../../context/applicationContext";
import axios from "axios";
import {setUser} from "../../store/actionCreators";
import {Field, Form, Formik} from "formik";
import {validationSchema} from "../../validation/validadionSchema";
import classNames from "classnames";
import personImg from "../../images/person.png";
import passwordImg from "../../images/password.png";
import {SET_USER_SESSION, SET_ERROR, MODAL_CONTROLLER} from "../../store/actions";

const SignIn = () => {
    const {state, dispatch} = useContext(ApplicationContext)

    const userLogIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/signin', state.signUp);
            if (response.status === 201) {
                dispatch(setUser(response.data.user))
                dispatch({type: SET_USER_SESSION, payload: response.data.session});
            }
        } catch (err) {
            console.error('Ошибка при отправке данных:', err);
            dispatch({type: SET_ERROR, payload: err.message});
        } finally {
            dispatch({type: MODAL_CONTROLLER, payload: {signUpModal: false, signInModal: false}})
        }
    };

    return (
        <div>
            <Formik
                initialValues={{
                    login: state.signUp.login,
                    password: state.signUp.password,
                }}
                validationSchema={validationSchema}
                onSubmit={userLogIn}>
                {({errors, touched}) => (
                    <Form className={classes.formContainer}>
                        <h1 style={{color: "black"}}>Sign In</h1>
                        <div className={classes.inputContainer}>
                            <img className={classes.imageContainer} src={personImg} alt="PersonIcon"/>
                            <Field
                                className={classNames(classes.field, {[classes.errorField]: errors.login && touched.login})}
                                id="login"
                                name="login"
                                placeholder="Login"/>
                        </div>
                        <div className={classes.tooltip}>
                            {errors.login && touched.login && (
                                <div className={classes.errorLabel}>{errors.login}</div>)}
                        </div>
                        <div className={classes.inputContainer}>
                            <img className={classes.imageContainer} src={passwordImg} alt="PasswordIcon"/>
                            <Field
                                className={classNames(classes.field, {[classes.errorField]: errors.password && touched.password})}
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className={classes.tooltip}>
                            {errors.password && touched.password && (
                                <div className={classes.errorLabel}>{errors.password}</div>)}
                        </div>
                        <button className={classes.submitButton} type="submit">Sign In</button>
                        <button className={cl.buttonSignUp} onClick={() => {
                            dispatch({type: MODAL_CONTROLLER, payload: {signInModal: false, signUpModal: true}})
                        }}>
                            Sign Up
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignIn;