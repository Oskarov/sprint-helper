import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPerformerItem, IPerformersState, IPerformerTaskPayload} from "../interfaces/IPerformers";
import {ITask} from "../interfaces/ITask";

const initialState: IPerformersState = {
    items: [],
}


const performersSlice = createSlice({
    name: 'performers',
    initialState: initialState,
    reducers: {
        addPerformer: (state, {payload}: PayloadAction<IPerformerItem>) => {
            return {
                ...state,
                items: [
                    ...state.items,
                    payload
                ]
            };
        },
        editPerformer: (state, {payload}: PayloadAction<Omit<IPerformerItem, 'tasks'>>) => {
            return {
                ...state,
                items: state.items.map(performer => performer.uuid !== payload.uuid ? performer : ({
                    ...performer,
                    ...payload
                }))
            };
        },
        removePerformer: (state, {payload}: PayloadAction<string>) => {
            return {
                ...state,
                items: state.items.filter(performer => performer.uuid !== payload)
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
        editTaskForPerformer: (state, {payload}: PayloadAction<IPerformerTaskPayload>) => {
            return {
                ...state,
                items: state.items.map(performer => performer.uuid !== payload.performerUuid ? performer : {
                    ...performer,
                    tasks: performer.tasks.map(task => task.uuid !== payload.task.uuid ? task : payload.task)
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
        removeAllPerformerTasks: (state) => {
            return {
                ...state,
                items: state.items.map(performer => ({
                    ...performer,
                    tasks: performer.tasks.filter(task => [10, 20, 30, 40].includes(task.type))
                }))
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
        setPerformersFromJson: (state, {payload}: PayloadAction<IPerformersState>) => {
            return {
                ...payload
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
    changePerformerTaskIndex,
    removeAllPerformerTasks,
    removePerformer,
    editPerformer,
    editTaskForPerformer,
    setPerformersFromJson,
} = performersSlice.actions;
