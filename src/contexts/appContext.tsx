import React                 from 'react';
import DragAndDropContext    from './dragAndDropContext/dragAndDropContext';
import ReduxContext          from './reduxContext/reduxContext';
import PerformerModalContext from "./performerModalContext/performerContext";
import TaskModalContext      from "./taskModalContext/taskModalContext";

interface AppContextProps {
    children: any
}

const AppContext: React.FC<AppContextProps> = ({children}) => {
    return <ReduxContext>
        <DragAndDropContext>
            <PerformerModalContext>
                <TaskModalContext>
                    {children}
                </TaskModalContext>
            </PerformerModalContext>
        </DragAndDropContext>
    </ReduxContext>;
}

export default AppContext;
