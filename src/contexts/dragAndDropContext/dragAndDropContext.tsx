import React                                                                         from 'react';
import {DragDropContext, DropResult}                                                 from 'react-beautiful-dnd';
import {useDispatch, useSelector}                                                    from 'react-redux';
import {store, TStore}                                                               from "../../store/store";
import {changeTaskIndex, createTaskWithIndex, removeTask}                            from "../../slices/tasks";
import {addTaskForPerformerWithIndex, changePerformerTaskIndex, removePerformerTask} from "../../slices/performers";

interface DragAndDropContextProps {
    children: any
}

const DragAndDropContext: React.FC<DragAndDropContextProps> = ({children}) => {
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

        //Из бэклога в бэклог
        if (result.source.droppableId === 'backlog' && result.destination?.droppableId === 'backlog') {
            dispatch(changeTaskIndex({uuid: result.draggableId, index: result.destination.index}));
        }

        //Из бэклога исполнителю
        if (result.source.droppableId === 'backlog' && result.destination?.droppableId !== 'backlog' && !!result.destination?.droppableId) {

            const task = store.getState().tasks.items.find(i => i.uuid === result.draggableId);
            if (task) {
                dispatch(removeTask(result.draggableId));
                dispatch(addTaskForPerformerWithIndex({
                    index: result.destination.index,
                    task,
                    performerUuid: result.destination.droppableId
                }));
            }
        }

        //От исполнителя в бэклог
        if (result.source.droppableId !== 'backlog' && result.destination?.droppableId === 'backlog') {
            const performer = store.getState().performers.items.find(i => i.uuid === result.source.droppableId);
            if (performer) {
                const task = performer.tasks.find(i => i.uuid === result.draggableId);
                if (task) {
                    dispatch(removePerformerTask({performerUuid: result.source.droppableId, uuid: result.draggableId}));
                    dispatch(createTaskWithIndex({task, index: result.destination.index}));
                }
            }

        }

        //От исполнителя себе самому
        if (result.source.droppableId === result.destination?.droppableId && result.source.droppableId !== 'backlog') {
            dispatch(changePerformerTaskIndex({
                performerUuid: result.source.droppableId,
                taskUuid: result.draggableId,
                index: result.destination.index
            }))
        }

        //От исполнителя другому исполнителю.
        if (result.source.droppableId !== result.destination?.droppableId && result.source.droppableId !== 'backlog' && !!result.destination?.droppableId) {
            const performer = store.getState().performers.items.find(i => i.uuid === result.source.droppableId);
            if (performer) {
                const task = performer.tasks.find(i => i.uuid === result.draggableId);
                if (task) {
                    dispatch(removePerformerTask({performerUuid: result.source.droppableId, uuid: result.draggableId}));
                    dispatch(addTaskForPerformerWithIndex({
                        index: result.destination.index,
                        task,
                        performerUuid: result.destination.droppableId
                    }));
                }
            }
        }
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
