const initialState = {
    signUp: {
        email: '',
        login: '',
        password: '',
        tier: "Default",
        preferredTimezone: '',
    },
    user:null,
    users:null,
    userSession:null,
    signInModal: false,
    signUpModal: false,
    sessions: null,
    isLoadingExistingSessions: false,
    isLoadingUsers: false,
    isLoadingSignUp: false,
    isLoadingSignIn: false,
    errorsExistingSessions:null,
    errorsUsers:null,
    errorsSignUp:null,
    errorsSignIn:null,
};

export default initialState;