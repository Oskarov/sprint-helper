import React                           from 'react';
import { useDispatch, useSelector }    from 'react-redux';
import styles                          from './index.module.scss';
import {TStore}                        from "../../store/store";
import {Button, Dialog, DialogContent} from "@mui/material";
import {setConfirmationClose}          from "../../slices/modal";

interface SimpleConfirmationDialogProps {
}

const ReduxConfirmationDialog: React.FC<SimpleConfirmationDialogProps> = () => {
    const { isOpen, confirmationFunction, dialogType, dialogText } = useSelector((state: TStore) => state.modal.confirmation);
    const dispatch = useDispatch();

    const getText = () => {
        switch (true) {
            case dialogText !== '':
                return dialogText;

            case dialogType === 'positive':
                return 'Сохранить введённые данные?';

            case dialogType === 'negative':
                return 'Отменить изменения?';
        }
    }

    return <Dialog
        open={isOpen}
        onClose={() => dispatch(setConfirmationClose())}
        aria-labelledby="simple-dialog-title"
        aria-describedby="simple-dialog-description"
        className="tms"
    >
        <DialogContent className={styles.content}>
            <div className={styles.title}>{getText()}</div>
            <div className={styles.buttons}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => dispatch(setConfirmationClose())}
                    className="medium primary outlined"
                >
                    {dialogType === 'positive' ? 'Отмена' : 'Нет'}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        dispatch(setConfirmationClose())
                        confirmationFunction();
                    }}
                    className="medium primary contained"
                >
                    {dialogType === 'positive' ? 'Ок' : 'Да, отменить'}
                </Button>
            </div>
        </DialogContent>
    </Dialog>;
}

export default ReduxConfirmationDialog;
