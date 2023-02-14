import {createSlice, PayloadAction}       from '@reduxjs/toolkit';
import {IPerformerItem, IPerformersState} from "../interfaces/IPerformers";

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
    }
})

export const performersReducer = performersSlice.reducer;
export const {
    addPerformer
} = performersSlice.actions;
