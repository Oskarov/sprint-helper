import React, {useContext, useState} from 'react';
import Dialog                        from "@mui/material/Dialog";
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
import {useDispatch}             from "react-redux";
import {TaskModalContextChanger} from "../../../../contexts/taskModalContext/taskModalContext";

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
    const modalChanger = useContext(TaskModalContextChanger);

    const handleTaskDialogOpen = () => {
        if (modalChanger){
            modalChanger({
                taskUuid: null,
                performerUuid: null
            })
        }
    };


    return <div onClick={handleTaskDialogOpen} className={styles.link}>
            <span>Добавить задачу</span><DownhillSkiingIcon/>
        </div>;
}

export default TaskModal;
