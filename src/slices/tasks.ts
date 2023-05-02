import {createSlice, PayloadAction}                              from '@reduxjs/toolkit';
import {IPerformerItem, IPerformersState, IPerformerTaskPayload} from "../interfaces/IPerformers";
import {ITask, ITasksState}                                      from "../interfaces/ITask";

const initialState: ITasksState = {
    items: [],
}


const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: (state, {payload}: PayloadAction<ITask>) => {
            return {
                ...state,
                items: [
                    ...state.items,
                    payload
                ]
            };
        },
        removeTask: (state, {payload}: PayloadAction<string>) => {
            return {
                ...state,
                items: state.items.filter(item => item.uuid !== payload)
            }
        },
        editTask: (state, {payload}: PayloadAction<ITask>) => {
            return {
                ...state,
                items: state.items.map(item => item.uuid !== payload.uuid ? item : payload)
            }
        },
        changeTaskIndex: (state, {payload}: PayloadAction<{ uuid: string, index: number }>) => {
            const currentItem = state.items.find(i => i.uuid === payload.uuid);
            if (currentItem) {
                const newItems = [...state.items].filter(i => i.uuid !== payload.uuid);
                newItems.splice(payload.index, 0, currentItem);
                return {
                    ...state,
                    items: newItems
                };
            }
        },
        createTaskWithIndex: (state, {payload}: PayloadAction<{ task: ITask, index: number }>) => {
            const newItems = [...state.items];
            newItems.splice(payload.index, 0, payload.task);
            return {
                ...state,
                items: newItems
            }
        },
        clearTasks: (state) => {
            return {
                ...state,
                items: []
            }
        },
        setTasksFromJson: (state, {payload}: PayloadAction<ITasksState>) => {
            return {
                ...payload
            }
        },
    }
})

export const tasksReducer = tasksSlice.reducer;
export const {
    addTask,
    removeTask,
    changeTaskIndex,
    createTaskWithIndex,
    clearTasks,
    editTask,
    setTasksFromJson
} = tasksSlice.actions;
