import {ITask} from "./ITask";

export interface IPerformersState {
    items: IPerformerItem[]
}

export interface IPerformerItem {
    uuid: string,
    firstName: string,
    lastName: string,
    roleId: number,
    tasks: ITask[]
}
export interface IPerformerTaskPayload {
    performerUuid: string,
    task: ITask,
}