import React from 'react';
import {useContext, useState, useEffect} from "react";
import {ApplicationContext} from "../../context/applicationContext";
import classes from "./AppMenu.module.css";
import cl from "../../UI/Modal/Modal.module.css"
import auctionImg from "../../images/auction.png"
import nightModeImg from "../../images/moon.png"
import dayModeImg from "../../images/sun.png"
import userImg from "../../images/user.png"
import Modal from "../../UI/Modal/Modal";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn"
import {setSignUpModal} from "../../store/actionCreators";

const AppMenu = () => {
    const {state, dispatch} = useContext(ApplicationContext)

    const [mode, setMode] = useState(false)

    const switchMode = () => setMode(!mode);

    useEffect(() => {
        if (mode) {
            document.body.style.background = 'darkgrey';
        } else {
            document.body.style.background = 'rgb(238,238,238)';
        }
    }, [mode]);


    const openSignInModal = () => {
        dispatch({type: "OPEN_SIGN_IN_MODAL"})
    }
    const openSignUpModal = () => {
        dispatch({type: "OPEN_SIGN_UP_MODAL"})
    }

    return (
        <div>
            <div className={classes.appMenu}>
                <div className={classes.searchContainer}>
                    <div className={classes.paddingContainer}><img src={auctionImg} alt="CalendarIcon"/></div>
                    <input/>
                </div>
                <div className={classes.signContainer}>
                    <div className={classes.sign}>
                        <div className={classes.paddingContainer}><img src={userImg} alt="User"/></div>
                        <button className={classes.paddingContainer} onClick={openSignInModal}>Sign In</button>
                        <button className={classes.paddingContainer} onClick={openSignUpModal}>Sign Up</button>
                    </div>
                    <div className={classes.image}>
                        <button className={classes.image} onClick={switchMode}>
                            {mode ? <img src={nightModeImg} alt="Moon"/> : <img src={dayModeImg} alt="Sun"/>}</button>
                    </div>
                    <Modal className={cl.modalContainer} visible={state.signUpModal}
                           setVisible={() => dispatch(setSignUpModal())}>
                        <SignUp/>
                    </Modal>
                    <Modal className={cl.modalContainer} visible={state.signInModal}
                           setVisible={() => dispatch({type: "SET_SIGN_IN_MODAL"})}>
                        <SignIn/>
                    </Modal>
                </div>
            </div>
            <h1 style={{display:'flex', justifyContent:'center', paddingTop:'25px'}}>
                {state.error}
            </h1>
        </div>
    );
};

export default AppMenu;