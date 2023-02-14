import React                           from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector }    from 'react-redux';
import {TStore}                        from "../../store/store";

interface DragAndDropContextProps {
    children: any
}

const DragAndDropContext: React.FC<DragAndDropContextProps> = ({ children }) => {
    const dispatch = useDispatch();

    /*
     const onBeforeCapture = useCallback(() => {
         /!*...*!/
     }, []);
     const onBeforeDragStart = useCallback(() => {
         /!*...*!/
     }, []);
     const onDragStart = useCallback(() => {
         /!*...*!/
     }, []);
     const onDragUpdate = useCallback(() => {
         /!*...*!/
     }, []);*/

    const onDragEnd = (result: DropResult) => {

    };

    return <DragDropContext
        /* onBeforeCapture={onBeforeCapture}
         onBeforeDragStart={onBeforeDragStart}
         onDragStart={onDragStart}
         onDragUpdate={onDragUpdate}*/
        onDragEnd={onDragEnd}
    >
        {children}
    </DragDropContext>;
}

export default DragAndDropContext;
