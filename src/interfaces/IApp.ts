import {ReactComponent} from "*.svg";

export interface IAppState {
    rowSize: number,
    sprintSize: number,
    valueOfDivision: number,
}

export interface IConfirmation {
    isOpen: boolean,
    confirmationFunction: () => void,
    dialogType?: 'positive' | 'negative',
    dialogText?: string
}

export interface IInformation {
    isOpen: boolean,
    modalTitle?: string
    modalText?: any
    closeButton?: boolean
}
