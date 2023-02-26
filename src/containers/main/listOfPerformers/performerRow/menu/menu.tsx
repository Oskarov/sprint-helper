import React, {useContext}                                                                from 'react';
import {Menu, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography} from "@mui/material";
import {Cloud, ContentCopy, ContentCut, ContentPaste}                                     from "@mui/icons-material";
import {useDispatch}                                                                      from "react-redux";
import {IPerformerItem}                                                                   from "../../../../../interfaces/IPerformers";
import {setConfirmationOpen}                                                              from "../../../../../slices/modal";
import {
    removePerformer,
    removePerformerTask
}                                                                                         from "../../../../../slices/performers";
import {PerformerModalContextChanger}                                                     from "../../../../../contexts/performerModalContext/performerContext";

interface menuProps {
    contextMenu: { mouseX: number, mouseY: number } | null,
    setContextMenu: React.Dispatch<React.SetStateAction<{ mouseX: number, mouseY: number } | null>>
    performer: IPerformerItem
}

const PerformerMenu: React.FC<menuProps> = ({contextMenu, setContextMenu, performer}) => {
    const dispatch = useDispatch();
    const performerModalAction = useContext(PerformerModalContextChanger);

    const handleEdit = () => {
        if (performerModalAction) {
            performerModalAction({
                id: performer.uuid,
            })
        }
    }

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleDelete = () => {
        dispatch(setConfirmationOpen({
            dialogType: "positive",
            dialogText: `Вы точно хотите удалить исполнителя ${performer.lastName} ${performer.firstName}?`,
            confirmationFunction: () => {
                dispatch(removePerformer(performer.uuid));
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

        <MenuItem disabled={true}>{performer.lastName} {performer.firstName}</MenuItem>
        <Divider/>
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <Divider/>
        <MenuItem style={{color: 'red'}}>Удалить исполнителя</MenuItem>
    </Menu>;
}

export default PerformerMenu;
