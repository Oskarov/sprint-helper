import React                               from 'react';
import {useDispatch, useSelector}          from 'react-redux';
import styles                              from './index.module.scss';
import {TStore}                            from "../../store/store";
import {Dialog, DialogContent, IconButton} from "@mui/material";
import {setInformationClose}               from "../../slices/modal";
import CloseIcon                           from '@mui/icons-material/Close';

interface SimpleConfirmationDialogProps {
}

const ReduxInformationDialog: React.FC<SimpleConfirmationDialogProps> = () => {
    const {isOpen, modalText, modalTitle, closeButton} = useSelector((state: TStore) => state.modal.information);
    const dispatch = useDispatch();
    return <Dialog
        open={isOpen}
        onClose={() => dispatch(setInformationClose())}
        aria-labelledby="simple-dialog-title"
        aria-describedby="simple-dialog-description"
        className="tms"
    >
        <DialogContent className={styles.content}>
            <div className={styles.roundButton} onClick={() => dispatch(setInformationClose())}>
                <CloseIcon/>
            </div>
            <div className={styles.title}>{modalTitle}</div>
            <div className={styles.text}>{modalText}</div>
        </DialogContent>
    </Dialog>;
}

export default ReduxInformationDialog;
