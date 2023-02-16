import React                   from 'react';
import styles                  from './app.module.scss';
import {useDispatch}           from "react-redux";
import Main                    from "./containers/main/main";
import ReduxConfirmationDialog from "./components/reduxConfirmationDialog";
import ReduxInformationDialog  from "./components/reduxInformationDialog";

export const hourDefinition = 20;
export const maxSprintHours = 60;


function App() {
    const dispatch = useDispatch();

    return (
        <div className={styles.app}>
            <Main/>
            <ReduxConfirmationDialog/>
            <ReduxInformationDialog/>
        </div>
    );
}

export default App;
