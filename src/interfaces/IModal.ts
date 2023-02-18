import {IConfirmation, IInformation} from "./IApp";

export interface IModalState{
    confirmation: IConfirmation,
    information: IInformation,
    targetTask: string,
}