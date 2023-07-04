import {useReducer} from "react";
import {ApplicationContext} from "./context/applicationContext";
import {reducer} from "./store/reducer";
import initialState from "./store/store";
import AppMenu from "./components/AppMenu";
import './App.css';
import {UserSessions} from "./components/UserSessions";


function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <ApplicationContext.Provider value={{state, dispatch}}>
                <AppMenu/>
                {state.user ? <UserSessions /> : null}
            </ApplicationContext.Provider>
        </div>
    );
}

export default App;
