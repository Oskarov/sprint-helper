import React             from 'react';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import {IJsonForExport}  from "../../../../interfaces/IUtils";
import {store}           from "../../../../store/store";


interface ExportJsonProps {

}

const ExportJson: React.FC<ExportJsonProps> = () => {
    const handleSaveJson = () => {
        const json:IJsonForExport = {
            performers: store.getState().performers.items,
            tasks: store.getState().tasks.items
        }

    }
    return <div onClick={handleSaveJson}><span>Загрузить json</span><DeveloperModeIcon/></div>;
}

export default ExportJson;
