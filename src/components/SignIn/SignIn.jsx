import React from 'react';
import {Field, Form, Formik} from "formik";
import classes from "../SignUp/SignUp.module.css";
import cl from "./SignIn.module.css"
import {useContext} from "react";
import {ApplicationContext} from "../../context/applicationContext";
import axios from "axios";
import {setUser} from "../../store/actionCreators";
import {validationSchemaSignIn} from "../../validation/validadionSchema";
import classNames from "classnames";
import personImg from "../../images/person.png";
import passwordImg from "../../images/password.png";
import {SET_USER_SESSION, SET_ERROR, MODAL_CONTROLLER, SET_IS_LOADING_SIGN_IN} from "../../store/actions";

const SignIn = () => {
    const {state, dispatch} = useContext(ApplicationContext)

    const userSignIn = async (values) => {
        try {
            dispatch({type: SET_IS_LOADING_SIGN_IN, payload: true})
            const response = await axios.post(`http://localhost:4000/auth/signin`, {...values});
            if (response.status === 201) {
                dispatch(setUser(response.data.user))
                dispatch({type: SET_USER_SESSION, payload: response.data.session});
            }
        } catch (err) {
            console.error('Ошибка при отправке данных:', err);
            dispatch({type: SET_ERROR, payload: err.message});
        } finally {
            dispatch({type: MODAL_CONTROLLER, payload: {signUpModal: false, signInModal: false}})
            dispatch({type: SET_IS_LOADING_SIGN_IN, payload: false})
        }
    };
    if (state.isLoadingSignIn) {
        return <div>Loading...</div>
    }
    if (state.errorsSignIn) {
        return <div>{state.errorsSignIn.message}</div>
    }

    return (
        <div>
            <Formik
                initialValues={{
                    login: 'test123',
                    password: 'test123',
                }}
                validationSchema={validationSchemaSignIn}
                onSubmit={(values)=>userSignIn(values)}>
                {({errors, touched, handleChange}) => (
                    <Form className={classes.formContainer}>
                        <h1 style={{color: "black"}}>Sign In</h1>
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
                        <button className={classes.submitButton} type="submit">Sign In</button>
                        <button className={cl.buttonSignUp} type="button" onClick={() => {
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