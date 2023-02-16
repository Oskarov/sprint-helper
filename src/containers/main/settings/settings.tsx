import React, {useState}                                  from 'react';
import styles                                             from './settings.module.scss';
import CN                                                 from "classnames";
import SettingsIcon                                       from '@mui/icons-material/Settings';
import DisplaySettingsIcon                                from '@mui/icons-material/DisplaySettings';
import CleaningServicesIcon                               from '@mui/icons-material/CleaningServices';
import DeveloperModeIcon                                  from '@mui/icons-material/DeveloperMode';
import Button                                             from '@mui/material/Button';
import TextField                                          from '@mui/material/TextField';
import Dialog                                             from '@mui/material/Dialog';
import DialogActions                                      from '@mui/material/DialogActions';
import DialogContent                                      from '@mui/material/DialogContent';
import DialogContentText                                  from '@mui/material/DialogContentText';
import DialogTitle                                        from '@mui/material/DialogTitle';
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useDispatch, useSelector}                         from "react-redux";
import {addTask}                                          from "../../../slices/tasks";
import {generateRandomString}                             from "../../../utils/generateRandomString";
import {TASK_TYPES_ENUM, taskTypes}                       from "../../../interfaces/ITask";
import {TStore}                                        from "../../../store/store";
import {setRowSize, setSprintSize, setValueOfDivision} from "../../../slices/app";

interface SettingsProps {

}

const Settings: React.FC<SettingsProps> = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
    const {app} = useSelector((state: TStore) => ({
        app: state.app,
    }));

     const handleTaskDialogOpen = () => {
        setCreateTaskDialogOpen(true);
    };

    const handleTaskDialogClose = () => {
        setCreateTaskDialogOpen(false);
    };



    return <div className={styles.settings}>
        <div className={CN(styles.addButton, {[styles.reverse]: open})} onClick={() => setOpen(open => !open)}>
            <SettingsIcon/>
        </div>
        <div className={CN(styles.list, {[styles.open]: open})}>
            <div onClick={handleTaskDialogOpen}><span>Настройки</span><DisplaySettingsIcon/></div>
            <div><span>Очистить беклог</span><CleaningServicesIcon/></div>
            <div><span>Загрузить json</span><DeveloperModeIcon/></div>
        </div>


        <div>
            <Dialog open={createTaskDialogOpen} onClose={handleTaskDialogClose}>
                <DialogTitle>Настройки</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ширина области отвечает за цветные поля драг энд дропа. Ширина спринта за линейку над областью исполнителя.
                        Цена деления - это ширина в пикселях которая присваивается единице величины задачи (часу или сторипоинту)
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="rowSize"
                        label="Ширина области"
                        type="number"
                        fullWidth
                        value={app.rowSize}
                        onChange={(e) => {
                            dispatch(setRowSize(+e.target.value))
                        }}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sprintSize"
                        label="Величина спринта"
                        type="number"
                        fullWidth
                        value={app.sprintSize}
                        onChange={(e) => {
                            dispatch(setSprintSize(+e.target.value))
                        }}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="vod"
                        label="Цена деления (px)"
                        type="number"
                        fullWidth
                        value={app.valueOfDivision}
                        onChange={(e) => {
                            dispatch(setValueOfDivision(+e.target.value))
                        }}
                        variant="standard"
                    />



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTaskDialogClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>;
}

export default Settings;
