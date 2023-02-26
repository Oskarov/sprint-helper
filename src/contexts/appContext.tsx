import React                 from 'react';
import DragAndDropContext    from './dragAndDropContext/dragAndDropContext';
import ReduxContext          from './reduxContext/reduxContext';
import PerformerModalContext from "./performerModalContext/performerContext";

interface AppContextProps {
    children: any
}

const AppContext: React.FC<AppContextProps> = ({children}) => {
    return <ReduxContext>
        <DragAndDropContext>
            <PerformerModalContext>
                {children}
            </PerformerModalContext>
        </DragAndDropContext>
    </ReduxContext>;
}

export default AppContext;
