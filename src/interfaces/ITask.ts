export interface ITask {
    uuid: string,
    name: string,
    number: string,
    capacity: number,
    type: number,
    projectId: number
}

export interface ITasksState {
    items: ITask[]
}

export const TASK_TYPES_ENUM = {
    REVIEW: 10,
    MEETINGS: 20,
    VACATION: 30,
    HOLLYDAYS: 40,
    BACKEND_TASK: 110,
    BACKEND_BUG: 120,
    BACKEND_TECH_DEBT: 130,
    FRONTEND_TASK: 210,
    FRONTEND_BUG: 220,
    FRONTEND_TECH_DEBT: 240
}


export const taskTypes = [
    {
        id: 1,
        name: 'Код Ревью',
        type: TASK_TYPES_ENUM.REVIEW
    },
    {
        id: 2,
        name: 'Встречи',
        type: TASK_TYPES_ENUM.MEETINGS
    },
    {
        id: 3,
        name: 'Бэкэнд Задача',
        type: TASK_TYPES_ENUM.BACKEND_TASK
    },
    {
        id: 4,
        name: 'Бэкэнд Баг',
        type: TASK_TYPES_ENUM.BACKEND_BUG
    },
    {
        id: 5,
        name: 'Бэкэнд Техдолг',
        type: TASK_TYPES_ENUM.BACKEND_TECH_DEBT
    },

    {
        id: 6,
        name: 'Фронтенд Задача',
        type: TASK_TYPES_ENUM.FRONTEND_TASK
    },
    {
        id: 7,
        name: 'Фронтенд Баг',
        type: TASK_TYPES_ENUM.FRONTEND_BUG
    },
    {
        id: 8,
        name: 'Фронтенд Техдолг',
        type: TASK_TYPES_ENUM.FRONTEND_TECH_DEBT
    },
    {
        id: 9,
        name: 'Отпуск',
        type: TASK_TYPES_ENUM.VACATION
    },
    {
        id: 10,
        name: 'Праздники',
        type: TASK_TYPES_ENUM.HOLLYDAYS
    },
];

export const projectsList = [
    {
        id: 10,
        name: 'TMS',
        color: '#172f70'
    },
    {
        id: 20,
        name: 'STK',
        color: '#177026'
    },
    {
        id: 30,
        name: 'STOR',
        color: '#70172f'
    },
    {
        id: 40,
        name: 'PP',
        color: '#705417'
    },
    {
        id: 50,
        name: 'GA',
        color: '#ff8132'
    },
    {
        id: 60,
        name: 'COM',
        color: '#fcd94b'
    }
]
