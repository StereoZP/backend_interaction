import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../context/applicationContext";
import axios from "axios";
import classes from "./SignUp.module.css";
import {Formik, Field, Form} from 'formik';
import {validationSchemaSignUp} from "../../validation/validadionSchema";
import classNames from "classnames";
import signUpImg from "../../images/signUp.png"
import emailImg from "../../images/email.png"
import personImg from "../../images/person.png"
import passwordImg from "../../images/password.png"
import {
    SET_USER_AUTH,
    MODAL_CONTROLLER,
    SET_IS_LOADING_SIGN_UP, SET_ERRORS_SIGN_UP
} from "../../store/actions";

const SignUp = () => {
    const {state, dispatch} = useContext(ApplicationContext)


    const userSubmit = async (values) => {
        try {
            dispatch({type: SET_IS_LOADING_SIGN_UP, payload: true})
            const response = await axios.post(`http://localhost:4000/auth/signup`, {...values, tier:'Default', preferredTimezone:''});
            if (response.status === 201) {
                dispatch({type: SET_USER_AUTH, payload: response.data});
            }
        } catch (err) {
            console.error('Ошибка при отправке данных:', err);
            console.log(err.response.data.message)
            dispatch({type: SET_ERRORS_SIGN_UP, payload: err.message});
        } finally {
            dispatch({type: MODAL_CONTROLLER, payload: {signUpModal: false, signInModal: false}})
            dispatch({type: SET_IS_LOADING_SIGN_UP, payload: false})

        }
    };
    if (state.isLoadingSignUp) {
        return <div>Loading...</div>
    }
    if (state.errorsSignUp) {
        return <div>{state.errorsSignUp.message}</div>
    }

    return (
        <div className={classes.signUpContainer}>
            <div>
                <Formik
                    initialValues={{
                        email: '',
                        login: '',
                        password: '',
                    }}
                    validationSchema={validationSchemaSignUp}
                    onSubmit={(values)=>userSubmit(values)}>
                    {({errors, touched, handleChange}) => (
                        <Form className={classes.formContainer}>
                            <h1 style={{color: "black"}}>Sign Up</h1>
                            <div className={classes.inputContainer}>
                                <img className={classes.imageContainer} src={emailImg} alt="EmailIcon"/>
                                <Field
                                    className={classNames(classes.field, {[classes.errorField]: errors.email && touched.email})}
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.tooltip}>
                                {errors.email && touched.email && (
                                    <div className={classes.errorLabel}>{errors.email}</div>)}
                            </div>
                            <div className={classes.inputContainer}>
                                <img className={classes.imageContainer} src={personImg} alt="PersonIcon"/>
                                <Field
                                    className={classNames(classes.field, {[classes.errorField]: errors.login && touched.login})}
                                    id="login"
                                    name="login"
                                    placeholder="Login"
                                    onChange={handleChange}/>
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
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.tooltip}>
                                {errors.password && touched.password && (
                                    <div className={classes.errorLabel}>{errors.password}</div>)}
                            </div>
                            <button className={classes.submitButton} type="submit">Sign Up
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div><img src={signUpImg} alt="CalendarIcon"/></div>
        </div>
    );
};

export default SignUp;