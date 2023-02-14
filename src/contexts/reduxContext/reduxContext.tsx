import React        from 'react';
import { Provider } from 'react-redux';
import {store}      from "../../store/store";

interface ReduxContextProps {
    children: any
}

const ReduxContext: React.FC<ReduxContextProps> = ({ children }) => {
    return <Provider store={store}>
        {children}
    </Provider>;
}

export default ReduxContext;
