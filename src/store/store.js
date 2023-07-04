const initialState = {
    signUp: {
        email: '',
        login: '',
        password: '',
        tier: "Default",
        preferredTimezone: '',
    },
    user:null,
    userSession:null,
    signInModal: false,
    signUpModal: false,
    sessions: null,
    isLoading: false,
};

export default initialState;