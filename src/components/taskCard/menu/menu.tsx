import React                                                                              from 'react';
import {Menu, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography} from "@mui/material";
import {Cloud, ContentCopy, ContentCut, ContentPaste}                                     from "@mui/icons-material";
import {useDispatch}                                                                      from "react-redux";
import {removeTask}                                                                       from "../../../slices/tasks";
import {ITask}                                                                            from "../../../interfaces/ITask";
import {removePerformerTask}                                                              from "../../../slices/performers";
import {setConfirmationOpen}                                                              from "../../../slices/modal";

interface menuProps {
    contextMenu: { mouseX: number, mouseY: number } | null,
    setContextMenu: React.Dispatch<React.SetStateAction<{ mouseX: number, mouseY: number } | null>>
    task: ITask
    performerLink: string
}

const TaskMenu: React.FC<menuProps> = ({contextMenu, setContextMenu, performerLink, task}) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleRemoveTask = () => {
        dispatch(setConfirmationOpen({
            dialogType: 'positive',
            dialogText: 'Удалить задачу?',
            confirmationFunction: () => {
                if (performerLink === 'backlog') {
                    dispatch(removeTask(task.uuid));
                } else {
                    dispatch(removePerformerTask({performerUuid: performerLink, uuid: task.uuid}));
                }
                handleClose();
            }
        }))
    }

    return <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
            contextMenu !== null
                ? {top: contextMenu.mouseY, left: contextMenu.mouseX}
                : undefined
        }
    >
        {performerLink !== 'backlog' && <>
            <MenuItem onClick={handleClose} disabled={true}>На верх бэклога</MenuItem>
            <MenuItem onClick={handleClose} disabled={true}>Вниз бэклога</MenuItem>
        </>}
        <MenuItem onClick={handleClose} disabled={true}>Редактировать</MenuItem>
        <MenuItem onClick={handleClose} disabled={true}>Копировать</MenuItem>
        <Divider/>
        <MenuItem onClick={handleRemoveTask} style={{color: 'red'}}>Удалить</MenuItem>
    </Menu>;
}

export default TaskMenu;
