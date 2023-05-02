import {createSlice, PayloadAction}                              from '@reduxjs/toolkit';
import {IPerformerItem, IPerformersState, IPerformerTaskPayload} from "../interfaces/IPerformers";
import {ITask, ITasksState}                     from "../interfaces/ITask";
import {IAppState, IConfirmation, IInformation} from "../interfaces/IApp";

const initialState: IAppState = {
    rowSize: 60,
    sprintSize: 60,
    valueOfDivision: 20,
}


const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setRowSize: (state, {payload}: PayloadAction<number>) => {
            return {
                ...state,
                rowSize: payload
            };
        },
        setSprintSize: (state, {payload}: PayloadAction<number>) => {
            return {
                ...state,
                sprintSize: payload
            };
        },
        setValueOfDivision: (state, {payload}: PayloadAction<number>) => {
            return {
                ...state,
                valueOfDivision: payload
            };
        },
        setAppFromJson: (state, {payload}: PayloadAction<IAppState>) => {
            return{
                ...payload
            }
        }
    }
})

export const appReducer = appSlice.reducer;
export const {
    setValueOfDivision,
    setSprintSize,
    setRowSize,
    setAppFromJson
} = appSlice.actions;
