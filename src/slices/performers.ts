import {createSlice, PayloadAction}                              from '@reduxjs/toolkit';
import {IPerformerItem, IPerformersState, IPerformerTaskPayload} from "../interfaces/IPerformers";
import {ITask}                                                   from "../interfaces/ITask";

const initialState: IPerformersState = {
    items: [
        {
            firstName: 'Андрей',
            lastName: 'Галкин',
            roleId: 1,
            tasks: [],
            uuid: '1a1a1a1a1a1a1a'
        },
        {
            firstName: 'Артём',
            lastName: 'Маколов',
            roleId: 1,
            tasks: [],
            uuid: '2r2r2r2r2r2r2r'
        },

    ],
}


const performersSlice = createSlice({
    name: 'performers',
    initialState: initialState,
    reducers: {
        addPerformer: (state, {payload}: PayloadAction<IPerformerItem>) => {
            return {
                ...state,
                items: {
                    ...state.items,
                    payload
                }
            };
        },
        addTaskForPerformer: (state, {payload}: PayloadAction<IPerformerTaskPayload>) => {
            return {
                ...state,
                items: state.items.map(performer => performer.uuid !== payload.performerUuid ? performer : {
                    ...performer,
                    tasks: [
                        ...performer.tasks,
                        payload.task
                    ],
                })
            }
        },
        addTaskForPerformerWithIndex: (state, {payload}: PayloadAction<{ performerUuid: string, task: ITask, index: number }>) => {
            return {
                ...state,
                items: state.items.map(performer => {
                    if (performer.uuid !== payload.performerUuid) return performer;
                    const newTasks = [...performer.tasks];
                    newTasks.splice(payload.index, 0, payload.task);
                    return {
                        ...performer,
                        tasks: newTasks
                    }
                })
            }
        },
        removePerformerTask: (state, {payload}: PayloadAction<{ performerUuid: string, uuid: string }>) => {
            return {
                ...state,
                items: state.items.map(performer => {
                    if (performer.uuid !== payload.performerUuid) return performer;
                    return {
                        ...performer,
                        tasks: performer.tasks.filter(task => task.uuid !== payload.uuid)
                    }
                })
            }
        },
        changePerformerTaskIndex: (state, {payload}: PayloadAction<{ performerUuid: string, taskUuid: string, index: number }>) => {
            return {
                ...state,
                items: state.items.map(performer => {
                    if (performer.uuid !== payload.performerUuid) return performer;
                    const currentTask = performer.tasks.find(i => i.uuid === payload.taskUuid);
                    const newTasks = [...performer.tasks].filter(i => i.uuid !== payload.taskUuid);
                    if (currentTask) {
                        newTasks.splice(payload.index, 0, currentTask);
                    }
                    return {
                        ...performer,
                        tasks: newTasks
                    }
                })
            }
        },
    }
})

export const performersReducer = performersSlice.reducer;
export const {
    addPerformer,
    addTaskForPerformer,
    addTaskForPerformerWithIndex,
    removePerformerTask,
    changePerformerTaskIndex
} = performersSlice.actions;
