import React, {createContext, useState}                   from 'react';
import {useDispatch}                                      from "react-redux";
import DialogTitle                                        from "@mui/material/DialogTitle";
import DialogContent                                      from "@mui/material/DialogContent";
import DialogContentText                                  from "@mui/material/DialogContentText";
import TextField                                          from "@mui/material/TextField";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import styles                                             from "../../containers/main/control/control.module.scss";
import {TASK_TYPES_ENUM, taskTypes}                       from "../../interfaces/ITask";
import DialogActions                                      from "@mui/material/DialogActions";
import Button                                             from "@mui/material/Button";
import Dialog                                             from "@mui/material/Dialog";
import {addTask, editTask}                                from "../../slices/tasks";
import {generateRandomString}                             from "../../utils/generateRandomString";
import {store}                                            from "../../store/store";
import {addTaskForPerformer, editTaskForPerformer}        from "../../slices/performers";

interface TaskModalContextProps {
    children: any
}

export interface ITaskModalContextData {
    taskUuid: string | null
    performerUuid: string | null
}

export const TaskModalContextChanger = createContext<((data: ITaskModalContextData) => void) | null>(null);

const TaskModalContext: React.FC<TaskModalContextProps> = ({children}) => {

    const initialTaskData = {
        name: '',
        number: '',
        capacity: 1,
        type: TASK_TYPES_ENUM.BACKEND_TASK
    }

    const dispatch = useDispatch();

    const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
    const [taskData, setTaskData] = useState(initialTaskData);
    const [taskUuid, setTaskUuid] = useState<string | null>(null)
    const [performerUuid, setPerformerUuid] = useState<string | null>(null)

    const enableModal = (data: ITaskModalContextData) => {
        setTaskUuid(data.taskUuid);
        setPerformerUuid(data.performerUuid);

        clearTaskData();

        if (!data.performerUuid && data.taskUuid) {
            const backlogTask = store.getState().tasks.items.find(task => task.uuid === data.taskUuid);
            if (backlogTask) {
                setTaskData({
                    name: backlogTask.name,
                    type: backlogTask.type,
                    number: backlogTask.number,
                    capacity: backlogTask.capacity
                })
            }
        }

        if (data.performerUuid && data.taskUuid) {

            const performerTask = store.getState().performers.items
                .find(i => i.uuid === data.performerUuid)?.tasks
                .find(j => j.uuid === data.taskUuid);

            if (performerTask) {
                setTaskData({
                    name: performerTask.name,
                    type: performerTask.type,
                    number: performerTask.number,
                    capacity: performerTask.capacity
                })
            }
        }

        setCreateTaskDialogOpen(true);
    }


    const handleTaskDialogOpen = () => {
        setCreateTaskDialogOpen(true);
    };

    const handleTaskDialogClose = () => {
        setCreateTaskDialogOpen(false);
        clearTaskData();
    };


    const clearTaskData = () => {
        setTaskData(initialTaskData);
    }

    const handleTaskDataChange = (name: string, value: any) => {
        setTaskData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleTypeChange = (event: SelectChangeEvent<number>) => {
        setTaskData(data => ({
            ...data,
            type: event.target.value as number
        }))
    }

    const handleTaskData = () => {
        if (taskData.name && taskData.number && taskData.capacity) {

            //???????????????? ?????????? ?????????? ?? ?????????????? ????????????????
            if (!taskUuid && !performerUuid) {
                dispatch(addTask({
                    ...taskData,
                    uuid: generateRandomString(10)
                }));
                handleTaskDialogClose();
            }

            //???????????????? ?????????? ?????????? ?? ?????????????? ??????????????????????
            if (!taskUuid && performerUuid) {
                dispatch(addTaskForPerformer({
                    performerUuid,
                    task: {
                        ...taskData,
                        uuid: generateRandomString(10)
                    }
                }))
            }

            //???????????????????????????? ?????????? ?? ??????????????????????
            if (taskUuid && performerUuid) {
                dispatch(editTaskForPerformer({
                    performerUuid,
                    task: {
                        ...taskData,
                        uuid: taskUuid
                    }
                }))
            }

            //???????????????????????????? ?????????? ?? ??????????????
            if (taskUuid && !performerUuid) {
                dispatch(editTask({
                    ...taskData,
                    uuid: taskUuid
                }))
            }

        }
    }

    return <TaskModalContextChanger.Provider value={enableModal}>
        {children}
        <Dialog open={createTaskDialogOpen} onClose={handleTaskDialogClose}>
            <DialogTitle>{taskUuid ? '???????????????? ????????????' : '?????????????? ????????????'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="number"
                    label="?????????? ???????????? ?? ????????"
                    placeholder="TMS-2092"
                    type="text"
                    fullWidth
                    value={taskData.number}
                    onChange={(e) => {
                        handleTaskDataChange('number', e.target.value)
                    }}
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="????????????????"
                    placeholder="???????????? ?????????????? ???? ??????"
                    type="text"
                    fullWidth
                    value={taskData.name}
                    onChange={(e) => {
                        handleTaskDataChange('name', e.target.value)
                    }}
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="capacity"
                    label="??????????????"
                    placeholder="12"
                    type="number"
                    fullWidth
                    value={taskData.capacity}
                    onChange={(e) => {
                        handleTaskDataChange('capacity', +e.target.value)
                    }}
                    variant="standard"
                />
                <FormControl variant="standard" className={styles.taskType}>
                    <Select
                        id="type"
                        value={taskData.type}
                        label="Age"
                        fullWidth={true}
                        onChange={handleTypeChange}
                    >
                        {taskTypes.map(taskType => <MenuItem value={taskType.type}
                                                             key={taskType.id}>{taskType.name}</MenuItem>)}
                    </Select>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleTaskDialogClose}>????????????</Button>
                <Button onClick={handleTaskData}>{taskUuid ? '??????????????????' : '??????????????'}</Button>
            </DialogActions>
        </Dialog>
    </TaskModalContextChanger.Provider>;
}

export default TaskModalContext;
