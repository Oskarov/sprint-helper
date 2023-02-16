import React, {useState}                                  from 'react';
import Dialog                                             from "@mui/material/Dialog";
import DialogTitle                                        from "@mui/material/DialogTitle";
import DialogContent                                      from "@mui/material/DialogContent";
import DialogContentText                                  from "@mui/material/DialogContentText";
import TextField                                          from "@mui/material/TextField";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import styles                                             from "../control.module.scss";
import {TASK_TYPES_ENUM, taskTypes}                       from "../../../../interfaces/ITask";
import DialogActions                                      from "@mui/material/DialogActions";
import Button                                             from "@mui/material/Button";
import {addTask}                                          from "../../../../slices/tasks";
import {generateRandomString}                             from "../../../../utils/generateRandomString";
import DownhillSkiingIcon                                 from "@mui/icons-material/DownhillSkiing";
import {useDispatch}                                      from "react-redux";

interface TaskModalProps {

}

const initialTaskData = {
    name: '',
    number: '',
    capacity: 1,
    type: TASK_TYPES_ENUM.BACKEND_TASK
}

const TaskModal: React.FC<TaskModalProps> = ({}) => {
    const dispatch = useDispatch();

    const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
    const [taskData, setTaskData] = useState(initialTaskData);

    const handleTaskData = () => {
        if (taskData.name && taskData.number && taskData.capacity) {
            dispatch(addTask({
                ...taskData,
                uuid: generateRandomString(10)
            }));
            handleTaskDialogClose();
        }
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

    return <div>
        <div onClick={handleTaskDialogOpen} className={styles.link}><span>Добавить задачу</span><DownhillSkiingIcon/></div>
        <div>
            <Dialog open={createTaskDialogOpen} onClose={handleTaskDialogClose}>
                <DialogTitle>Создать задачу</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Задача создаётся в бэклог.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="number"
                        label="Номер задачи в жире"
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
                        label="Название"
                        placeholder="Импорт заказов из ЕРП"
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
                        label="Ёмкость"
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
                    <Button onClick={handleTaskDialogClose}>Отмена</Button>
                    <Button onClick={handleTaskData}>Создать</Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>;
}

export default TaskModal;
