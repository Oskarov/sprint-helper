import React              from 'react';
import DragAndDropContext from './dragAndDropContext/dragAndDropContext';
import ReduxContext       from './reduxContext/reduxContext';

interface AppContextProps {
    children: any
}

const AppContext: React.FC<AppContextProps> = ({children}) => {
    return <ReduxContext>
        <DragAndDropContext>
            {children}
        </DragAndDropContext>
    </ReduxContext>;
}

export default AppContext;
