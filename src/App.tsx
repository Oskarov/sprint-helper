import React            from 'react';
import styles           from './app.module.scss';
import ListOfPerformers from "./containers/main/listOfPerformers/listOfPerformers";

function App() {
    return (
        <div className={styles.app}>
            <ListOfPerformers/>
        </div>
    );
}

export default App;
