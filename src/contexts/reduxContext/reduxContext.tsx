import React          from 'react';
import { Provider }   from 'react-redux';
import {store}        from "../../store/store";
import {PersistGate}  from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

interface ReduxContextProps {
    children: any
}

const ReduxContext: React.FC<ReduxContextProps> = ({ children }) => {
    let persistor = persistStore(store)

    return <Provider store={store}>
        <PersistGate persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
}

export default ReduxContext;
