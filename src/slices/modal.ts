import {createSlice, PayloadAction}                              from '@reduxjs/toolkit';
import {IPerformerItem, IPerformersState, IPerformerTaskPayload} from "../interfaces/IPerformers";
import {ITask, ITasksState}                                      from "../interfaces/ITask";
import {IAppState, IConfirmation, IInformation}                  from "../interfaces/IApp";
import {IModalState}                                             from "../interfaces/IModal";

const initialState: IModalState = {
    confirmation: {
        isOpen: false,
        confirmationFunction: () => {},
        dialogType: 'positive',
        dialogText: ''
    },
    information: {
        isOpen: false,
        modalText: '',
        modalTitle: '',
        closeButton: false,
    }
}


const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setConfirmationOpen: (state, { payload }: PayloadAction<Partial<IConfirmation>>) => {
            return {
                ...state,
                confirmation: {
                    ...state.confirmation,
                    dialogText: '',
                    ...payload,
                    isOpen: true
                }
            };
        },
        setConfirmationClose: (state) => {
            return {
                ...state,
                confirmation: {
                    ...state.confirmation,
                    isOpen: false
                }
            }
        },
        setInformationOpen: (state, { payload }: PayloadAction<Partial<IInformation>>) => {
            return {
                ...state,
                information: {
                    ...state.information,
                    modalText: '',
                    modalTitle: '',
                    closeButton: false,
                    ...payload,
                    isOpen: true
                }
            };
        },
        setInformationClose: (state) => {
            return {
                ...state,
                information: {
                    ...state.information,
                    isOpen: false
                }
            }
        }
    }
})

export const modalReducer = modalSlice.reducer;
export const {
    setConfirmationOpen,
    setInformationOpen,
    setInformationClose,
    setConfirmationClose
} = modalSlice.actions;
