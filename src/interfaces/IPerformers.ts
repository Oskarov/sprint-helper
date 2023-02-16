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

export const PERFORMER_TYPES_ENUM = {
    FRONTEND: 10,
    BACKEND: 20,
    TESTING: 30,
    ANALYTICS: 40,
}


export const performerTypes = [
    {
        id: 1,
        name: 'Фронтенд разработчик',
        type: PERFORMER_TYPES_ENUM.FRONTEND
    },
    {
        id: 2,
        name: 'Бэкэнд разработчик',
        type: PERFORMER_TYPES_ENUM.BACKEND
    },
    {
        id: 3,
        name: 'Тестировщик',
        type: PERFORMER_TYPES_ENUM.TESTING
    },
    {
        id: 4,
        name: 'Аналитик',
        type: PERFORMER_TYPES_ENUM.ANALYTICS
    },

]