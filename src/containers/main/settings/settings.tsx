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
import {useDispatch, useSelector}                         from "react-redux";
import {clearTasks}                              from "../../../slices/tasks";
import {TStore}                                           from "../../../store/store";
import {setRowSize, setSprintSize, setValueOfDivision}    from "../../../slices/app";
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
            dialogText: "???? ?????????? ???????????? ???????????????? ???????????? ?????????????????",
            confirmationFunction: () => {
                dispatch(clearTasks());
            }
        }))
    }

    const handleClearPerformersTasks = () => {
        dispatch(setConfirmationOpen({
            dialogType: "positive",
            dialogText: "???? ?????????? ???????????? ???????????????? ???????????? ???????? ?????????????????????????",
            confirmationFunction: () => {
                dispatch(removeAllPerformerTasks());
            }
        }))
    }
    const versionHandle = () => {
        dispatch(setInformationOpen({
            modalTitle: "????????????????????",
            isOpen: true,
            modalText: <div>
                <ul>
                    <li>?????????????????? ?????????????????????? ?????????????????????????? ??????????</li>
                    <li>----------------------------------------</li>
                    <li>?????????????????? ?????????????????????? ?????????????????????????? ?????????????????????? ?????????? ?????????????????????? ????????</li>
                    <li>???????????? ?????? ???????? ???? ?????????????????? ?? ?????????? ????????????????????</li>
                    <li>----------------------------------------</li>
                    <li>?????????????????? ???????? ?????????????? ?? ?????????????? ??????????????????</li>
                    <li>?????????????????? ?????????? ???????????????????? ???? ?????????????? ?? ???????????? ???????????????? (???? ???????????? ?? ????????????????)</li>
                    <li>?????????????????? ?????????????????????? ???????????? ???????????????????? ?????????? ?? ???????????? ???????????? + ?????????????????? ?????? ??????????????????</li>
                    <li>?????????????????? ?????????????????????? ???????????? ?????????? ???????????????? ??????????????????????</li>
                    <li>----------------------------------------</li>
                    <li>?????????????????? ?????????????????????? ?????????????? ???????????????? ???? ???????????????????????? ????????</li>
                    <li>???????????????? ?? ?????????? ?? ?????? ???? ?????????????? ???????????? ????????????????????????????, ???????????????? ?????? ?? ?????????? ???????????? ??????????
                        ??????????
                    </li>
                    <li>???????? ?????????????????????? ?????????????????????? ?????????????? ???????????????????????? ???? ?????????? ???? ??????????????</li>
                </ul>
            </div>
        }));
    }


    return <div className={styles.settings}>
        <div className={CN(styles.addButton, {[styles.reverse]: open})} onClick={() => setOpen(open => !open)}>
            <SettingsIcon/>
        </div>
        <div className={styles.version} onClick={versionHandle}>v 1.06</div>
        <div className={CN(styles.list, {[styles.open]: open})}>
            <div onClick={handleTaskDialogOpen}><span>??????????????????</span><DisplaySettingsIcon/></div>
            <div onClick={handleClearBacklog}><span>???????????????? ???????????? ????????????????</span><CleaningServicesIcon/></div>
            <div onClick={handleClearPerformersTasks}><span>???????????????? ???????????? ????????????????????????</span><AutoFixHighIcon/></div>
            {/*<ExportJson />*/}
        </div>


        <div>
            <Dialog open={createTaskDialogOpen} onClose={handleTaskDialogClose}>
                <DialogTitle>??????????????????</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ???????????? ?????????????? ???????????????? ???? ?????????????? ???????? ???????? ?????? ??????????. ???????????? ?????????????? ???? ?????????????? ?????? ????????????????
                        ??????????????????????.
                        ???????? ?????????????? - ?????? ???????????? ?? ???????????????? ?????????????? ?????????????????????????? ?????????????? ???????????????? ???????????? (???????? ??????
                        ??????????????????????)
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="rowSize"
                        label="???????????? ??????????????"
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
                        label="???????????????? ??????????????"
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
                        label="???????? ?????????????? (px)"
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
                    <Button onClick={handleTaskDialogClose}>??????????????</Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>;
}

export default Settings;
