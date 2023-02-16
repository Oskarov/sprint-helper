import React, {useState}                                  from 'react';
import Dialog                                             from "@mui/material/Dialog";
import DialogTitle                                        from "@mui/material/DialogTitle";
import DialogContent                                      from "@mui/material/DialogContent";
import DialogContentText                                  from "@mui/material/DialogContentText";
import TextField                                          from "@mui/material/TextField";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import styles                                             from "../control.module.scss";
import DialogActions                                      from "@mui/material/DialogActions";
import Button                                             from "@mui/material/Button";
import {generateRandomString}                             from "../../../../utils/generateRandomString";
import {useDispatch}                                      from "react-redux";
import PlaylistAddIcon                                    from "@mui/icons-material/PlaylistAdd";
import {addPerformer}                                     from "../../../../slices/performers";
import {performerTypes}                                   from "../../../../interfaces/IPerformers";

interface TaskModalProps {

}

const initialData = {
    firstName: '',
    lastName: '',
    roleId: 10,
}

const PerformerModal: React.FC<TaskModalProps> = ({}) => {
    const dispatch = useDispatch();

    const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);
    const [data, setData] = useState(initialData);

    const handleTaskData = () => {
        if (data.firstName && data.lastName ) {
            dispatch(addPerformer({
                ...data,
                uuid: generateRandomString(10),
                tasks: []
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
        setData(initialData);
    }

    const handleTaskDataChange = (name: string, value: any) => {
        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleTypeChange = (event: SelectChangeEvent<number>) => {
        setData(data => ({
            ...data,
            roleId: event.target.value as number
        }))
    }

    return <div>
        <div onClick={handleTaskDialogOpen} className={styles.link}><span>Добавить исполнителя</span><PlaylistAddIcon/></div>
        <div>
            <Dialog open={createTaskDialogOpen} onClose={handleTaskDialogClose}>
                <DialogTitle>Добавить исполнителя</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>


                    <FormControl variant="standard">
                        <Select
                            id="type"
                            value={data.roleId}
                            label="Age"
                            fullWidth={true}
                            onChange={handleTypeChange}
                        >
                            {performerTypes.map(taskType => <MenuItem value={taskType.type}
                                                                      key={taskType.id}>{taskType.name}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastName"
                        label="Фамилия"
                        type="text"
                        fullWidth
                        value={data.lastName}
                        onChange={(e) => {
                            handleTaskDataChange('lastName', e.target.value)
                        }}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="Имя"
                        type="text"
                        fullWidth
                        value={data.firstName}
                        onChange={(e) => {
                            handleTaskDataChange('firstName', e.target.value)
                        }}
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTaskDialogClose}>Отмена</Button>
                    <Button onClick={handleTaskData}>Создать</Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>;
}

export default PerformerModal;
