import React, {useState}                         from 'react';
import {Dialog, DialogContent, TextareaAutosize} from "@mui/material";
import styles                                    from "../../../../components/reduxInformationDialog/index.module.scss";
import CloseIcon                                 from "@mui/icons-material/Close";
import SaveAltIcon                               from '@mui/icons-material/SaveAlt';
import {useDispatch, useSelector}                from "react-redux";
import {TStore}                                  from "../../../../store/store";
import Button                                    from "@mui/material/Button";
import {setAppFromJson}                          from "../../../../slices/app";
import {setPerformersFromJson}                   from "../../../../slices/performers";
import {setTasksFromJson}                        from "../../../../slices/tasks";


const FromJson: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const handleImport = () => {
        if (value) {
            const jsoned = JSON.parse(value);
            dispatch(setAppFromJson(jsoned.app));
            dispatch(setPerformersFromJson(jsoned.performers));
            dispatch(setTasksFromJson(jsoned.tasks));
            setIsOpen(false);
        }
    }

    return <div>
        <div onClick={() => setIsOpen(true)}>
            <SaveAltIcon/>
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
                <div className={styles.title}>Загрузить JSON</div>
                <TextareaAutosize className={styles.area}
                                  onChange={(e) => setValue(e.target.value)}
                                  value={value}/>
                <Button onClick={handleImport}>Загрузить</Button>
            </DialogContent>
        </Dialog>
    </div>;
}

export default FromJson;
