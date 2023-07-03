import {useReducer} from "react";
import {ApplicationContext} from "./context/applicationContext";
import {reducer} from "./store/reducer";
import initialState from "./store/store";
import AppMenu from "./components/AppMenu";
import './App.css';


function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <ApplicationContext.Provider value={{state, dispatch}}>
                <AppMenu/>
            </ApplicationContext.Provider>
        </div>
    );
}

export default App;
