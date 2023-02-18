import React, {useState}                                  from 'react';
import styles                                             from './settings.module.scss';
import CN                                                 from "classnames";
import SettingsIcon                                       from '@mui/icons-material/Settings';
import DisplaySettingsIcon                                from '@mui/icons-material/DisplaySettings';
import CleaningServicesIcon                               from '@mui/icons-material/CleaningServices';
import AutoFixHighIcon                                    from '@mui/icons-material/AutoFixHigh';
import Button                                             from '@mui/material/Button';
import TextField                                          from '@mui/material/TextField';
import Dialog                                             from '@mui/material/Dialog';
import DialogActions                                      from '@mui/material/DialogActions';
import DialogContent                                      from '@mui/material/DialogContent';
import DialogContentText                                  from '@mui/material/DialogContentText';
import DialogTitle                                        from '@mui/material/DialogTitle';
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useDispatch, useSelector}                         from "react-redux";
import {addTask, clearTasks}                              from "../../../slices/tasks";
import {generateRandomString}                             from "../../../utils/generateRandomString";
import {TASK_TYPES_ENUM, taskTypes}                       from "../../../interfaces/ITask";
import {TStore}                                           from "../../../store/store";
import {setRowSize, setSprintSize, setValueOfDivision}    from "../../../slices/app";
import ExportJson                                         from './exportJson/exportJson';
import {setConfirmationOpen, setInformationOpen}          from "../../../slices/modal";
import {removeAllPerformerTasks}                          from "../../../slices/performers";

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

    const handleClearBacklog = () => {
        dispatch(setConfirmationOpen({
            dialogType: "positive",
            dialogText: "Вы точно хотите очистить бэклог продукта?",
            confirmationFunction: () => {
                dispatch(clearTasks());
            }
        }))
    }

    const handleClearPerformersTasks = () => {
        dispatch(setConfirmationOpen({
            dialogType: "positive",
            dialogText: "Вы точно хотите очистить бэклог всех исполнителей?",
            confirmationFunction: () => {
                dispatch(removeAllPerformerTasks());
            }
        }))
    }
    const versionHandle = () => {
        dispatch(setInformationOpen({
            modalTitle: "Информация",
            isOpen: true,
            modalText: <div>
                <ul>
                    <li>Добавлена возможность удалять карточки из контекстного меню</li>
                    <li>Карточки с одним и тем же номером задачи подсвечиваются, например Бэк и Фронт задачи одной
                        стори
                    </li>
                    <li>Есть возможность сворачивать бэклоги исполнителей по клику на стрелку</li>
                </ul>
            </div>
        }));
    }


    return <div className={styles.settings}>
        <div className={CN(styles.addButton, {[styles.reverse]: open})} onClick={() => setOpen(open => !open)}>
            <SettingsIcon/>
        </div>
        <div className={styles.version} onClick={versionHandle}>v 1.03</div>
        <div className={CN(styles.list, {[styles.open]: open})}>
            <div onClick={handleTaskDialogOpen}><span>Настройки</span><DisplaySettingsIcon/></div>
            <div onClick={handleClearBacklog}><span>Очистить беклог продукта</span><CleaningServicesIcon/></div>
            <div onClick={handleClearPerformersTasks}><span>Очистить беклог исполнителей</span><AutoFixHighIcon/></div>
            {/*<ExportJson />*/}
        </div>


        <div>
            <Dialog open={createTaskDialogOpen} onClose={handleTaskDialogClose}>
                <DialogTitle>Настройки</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ширина области отвечает за цветные поля драг энд дропа. Ширина спринта за линейку над областью
                        исполнителя.
                        Цена деления - это ширина в пикселях которая присваивается единице величины задачи (часу или
                        сторипоинту)
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
