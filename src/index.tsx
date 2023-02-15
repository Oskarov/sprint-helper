import React      from 'react';
import ReactDOM   from 'react-dom/client';
import App        from './App';
import AppContext from "./contexts/appContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <AppContext>
        <App/>
    </AppContext>
);