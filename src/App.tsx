import React                 from 'react';
import styles                from './app.module.scss';
import ListOfPerformers      from "./containers/main/listOfPerformers/listOfPerformers";
import {useDispatch}         from "react-redux";
import {addTaskForPerformer} from "./slices/performers";
import Main                  from "./containers/main/main";

export const hourDefinition = 20;
export const maxSprintHours = 60;


function App() {
    const dispatch = useDispatch();

    return (
        <div className={styles.app}>
            <Main/>
        </div>
    );
}

export default App;
