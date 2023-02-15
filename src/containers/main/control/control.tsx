import React, {useState}  from 'react';
import styles             from './control.module.scss';
import CN                 from "classnames";
import AddIcon            from '@mui/icons-material/Add';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import PlaylistAddIcon    from '@mui/icons-material/PlaylistAdd';

import Button                                             from '@mui/material/Button';
import TextField                                          from '@mui/material/TextField';
import Dialog                                             from '@mui/material/Dialog';
import DialogActions                                      from '@mui/material/DialogActions';
import DialogContent                                      from '@mui/material/DialogContent';
import DialogContentText                                  from '@mui/material/DialogContentText';
import DialogTitle                                        from '@mui/material/DialogTitle';
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useDispatch}                                      from "react-redux";
import {addTask}                                          from "../../../slices/tasks";
import {generateRandomString}       from "../../../utils/generateRandomString";
import {TASK_TYPES_ENUM, taskTypes} from "../../../interfaces/ITask";

interface ControlProps {

}

const initialTaskData = {
    name: '',
    number: '',
    capacity: 1,
    type: TASK_TYPES_ENUM.BACKEND_TASK
}

const Control: React.FC<ControlProps> = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

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

    const clearTaskData = () => {
        setTaskData(initialTaskData);
    }

    return <div className={styles.control}>
        <div className={CN(styles.addButton, {[styles.reverse]: open})} onClick={() => setOpen(open => !open)}>
            <AddIcon/>
        </div>
        <div className={CN(styles.list, {[styles.open]: open})}>
            <div onClick={handleTaskDialogOpen}><span>Добавить задачу</span><DownhillSkiingIcon/></div>
            <div><span>Добавить исполнителя</span><PlaylistAddIcon/></div>
        </div>


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
                            handleTaskDataChange('capacity', e.target.value)
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

export default Control;
