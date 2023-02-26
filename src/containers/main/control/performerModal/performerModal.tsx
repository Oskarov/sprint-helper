import React, {useContext, useState}                      from 'react';
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
import {PerformerModalContextChanger}                     from "../../../../contexts/performerModalContext/performerContext";

interface TaskModalProps {

}


const PerformerModal: React.FC<TaskModalProps> = () => {
    const performerModalAction = useContext(PerformerModalContextChanger);

    const handleClick = () => {
        if (performerModalAction) {
            performerModalAction({
                id: null,
            })
        }
    }

    return <div>
        <div onClick={handleClick} className={styles.link}>
            <span>Добавить исполнителя</span><PlaylistAddIcon/>
        </div>
    </div>;
}

export default PerformerModal;
