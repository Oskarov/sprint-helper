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
import {generateRandomString}                             from "../../../utils/generateRandomString";
import {TASK_TYPES_ENUM, taskTypes}                       from "../../../interfaces/ITask";
import TaskModal                                          from "./taskModal/taskModal";
import PerformerModal                                     from "./performerModal/performerModal";

interface ControlProps {

}

const Control: React.FC<ControlProps> = () => {

    const [open, setOpen] = useState(false);


    return <div className={styles.control}>
        <div className={CN(styles.addButton, {[styles.reverse]: open})} onClick={() => setOpen(open => !open)}>
            <AddIcon/>
        </div>
        <div className={CN(styles.list, {[styles.open]: open})}>
            <TaskModal/>
            <PerformerModal/>
        </div>


    </div>;
}

export default Control;
