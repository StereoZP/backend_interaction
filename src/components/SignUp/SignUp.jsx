import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../context/applicationContext";
import axios from "axios";
import classes from "./SignUp.module.css";
import {Formik, Field, Form} from 'formik';
import classNames from "classnames";
import {validationSchema} from "../../validation/validadionSchema";
import signUpImg from "../../images/signUp.png"
import emailImg from "../../images/email.png"
import personImg from "../../images/person.png"
import passwordImg from "../../images/password.png"
import {SET_USER_AUTH, SET_ERROR, MODAL_CONTROLLER} from "../../store/actions";

const SignUp = () => {
    const {state, dispatch} = useContext(ApplicationContext)

    const userSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/auth/signup', state.signUp);
            if (response.status === 201) {
                dispatch({type: SET_USER_AUTH, payload: response.data});
            }
        } catch (err) {
            console.error('Ошибка при отправке данных:', err);
            dispatch({type: SET_ERROR, payload: err.message});
        } finally {
            dispatch({type:MODAL_CONTROLLER, payload:{signUpModal:false, signInModal: false }})
        }
    };

    return (
        <div className={classes.signUpContainer}>
            <div>
                <Formik
                    initialValues={{
                        email: state.signUp.email,
                        login: state.signUp.login,
                        password: state.signUp.password,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={userSubmit}>
                    {({errors, touched}) => (
                        <Form className={classes.formContainer}>
                            <h1 style={{color:"black"}}>Sign Up</h1>
                            <div className={classes.inputContainer}>
                                <img className={classes.imageContainer} src={emailImg} alt="EmailIcon"/>
                                <Field
                                    className={classNames(classes.field, {[classes.errorField]: errors.email && touched.email})}
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"/>
                            </div>
                            <div className={classes.tooltip}>
                                {errors.email && touched.email && (<div className={classes.errorLabel}>{errors.email}</div>)}
                            </div>
                            <div className={classes.inputContainer}>
                                <img className={classes.imageContainer} src={personImg} alt="PersonIcon"/>
                                <Field
                                    className={classNames(classes.field, {[classes.errorField]: errors.login && touched.login})}
                                    id="login"
                                    name="login"
                                    placeholder="Login"/>
                            </div>
                            <div className={classes.tooltip}>
                                {errors.login && touched.login && (<div className={classes.errorLabel}>{errors.login}</div>)}
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
                                {errors.password && touched.password &&(<div className={classes.errorLabel}>{errors.password}</div>)}
                            </div>
                            <button className={classes.submitButton} type="submit">Sign Up</button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div><img src={signUpImg} alt="CalendarIcon"/></div>
        </div>
    );
};

export default SignUp;