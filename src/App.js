import {useReducer} from "react";
import {ApplicationContext} from "./context/applicationContext";
import {reducer} from "./store/reducer";
import initialState from "./store/store";
import AppMenu from "./components/AppMenu/AppMenu";
import './App.css';
import {UserSessions} from "./components/UserSession/UserSessions";
import DeleteSession from "./components/UserSession/DeleteSession";
import GetUsers from "./components/Users/GetUsers";

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div>
            <ApplicationContext.Provider value={{state, dispatch}}>
                <AppMenu/>
                {state.user ? <UserSessions /> : null}
                <DeleteSession/>
                {state.user ? <GetUsers /> : null}
            </ApplicationContext.Provider>
        </div>
    );
}

export default App;
