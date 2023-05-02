import React, {useState}                         from 'react';
import {Dialog, DialogContent, TextareaAutosize} from "@mui/material";
import {setInformationClose}                     from "../../../../slices/modal";
import styles                                    from "../../../../components/reduxInformationDialog/index.module.scss";
import CloseIcon                                 from "@mui/icons-material/Close";
import FileUploadIcon                            from '@mui/icons-material/FileUpload';
import {useSelector}                             from "react-redux";
import {TStore}                                  from "../../../../store/store";


const ToJson: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {tasks, app, performers} = useSelector((state: TStore) => ({
        performers: state.performers,
        tasks: state.tasks,
        app: state.app
    }));

    return <div>
        <div onClick={() => setIsOpen(true)}>
            <FileUploadIcon/>
        </div>
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="simple-dialog-title"
            aria-describedby="simple-dialog-description"
            className="tms"
        >
            <DialogContent className={styles.content}>
                <div className={styles.roundButton} onClick={() => setIsOpen(false)}>
                    <CloseIcon/>
                </div>
                <div className={styles.title}>Подготовленный JSON</div>
                <TextareaAutosize className={styles.area}
                                  value={JSON.stringify({tasks: tasks, performers: performers, app: app})}/>
            </DialogContent>
        </Dialog>
    </div>;
}

export default ToJson;
