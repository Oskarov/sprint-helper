import React, {useState}                      from 'react';
import {IPerformerItem, PERFORMER_TYPES_ENUM} from "../../../../interfaces/IPerformers";
import {Draggable, Droppable}                 from "react-beautiful-dnd";
import {inspect}                              from "util";
import styles                                 from './performanceRow.module.scss';
import CN                                     from 'classnames';
import {hourDefinition, maxSprintHours}       from "../../../../App";
import TaskCard                               from "../../../../components/taskCard/taskCard";
import {useSelector}                          from "react-redux";
import {TStore}                               from "../../../../store/store";
import Ruler                                  from "./ruler/ruler";
import Metrics                                from "./metrics/metrics";
import QrCode2Icon                            from '@mui/icons-material/QrCode2';
import IntegrationInstructionsIcon            from '@mui/icons-material/IntegrationInstructions';
import BugReportIcon                          from '@mui/icons-material/BugReport';
import AnalyticsIcon                          from '@mui/icons-material/Analytics';
import KeyboardArrowDownIcon                  from '@mui/icons-material/KeyboardArrowDown';

interface PerformerRowProps {
    performer: IPerformerItem
}

const getListStyle = (isDraggingOver: boolean, rowSize: number,
                      sprintSize: number,
                      valueOfDivision: number) => ({
    background: isDraggingOver ? 'lightblue' : 'rgba(229,229,229,0.36)',
    display: 'flex',
    padding: '8px 0',
    overflow: 'auto',
    width: `${rowSize * valueOfDivision}px`
});

const PerformerRow: React.FC<PerformerRowProps> = ({performer}) => {
    const {app} = useSelector((state: TStore) => ({
        app: state.app,
    }));

    const [open, setOpen] = useState(true)

    return <div className={styles.performer}>
        <div className={styles.titleRow}>
            <div className={styles.left}>
                <div className={styles.icon}>
                    {performer.roleId === PERFORMER_TYPES_ENUM.FRONTEND && <QrCode2Icon/>}
                    {performer.roleId === PERFORMER_TYPES_ENUM.BACKEND && <IntegrationInstructionsIcon/>}
                    {performer.roleId === PERFORMER_TYPES_ENUM.TESTING && <BugReportIcon/>}
                    {performer.roleId === PERFORMER_TYPES_ENUM.ANALYTICS && <AnalyticsIcon/>}
                </div>
                <div className={styles.name}>{`${performer.lastName} ${performer.firstName}`}</div>
                <Metrics performer={performer}/>
                <div className={CN(styles.icon, {[styles.close]: !open})} onClick={() => setOpen(open => !open)}>
                    <KeyboardArrowDownIcon/>
                </div>
            </div>
            <div className={styles.right}>

            </div>

        </div>
        {open && <>
            <Ruler performerUuid={performer.uuid}/>
            <Droppable droppableId={`${performer.uuid}`} direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver, app.rowSize, app.sprintSize, app.valueOfDivision)}
                        className={styles.listRow}
                        {...provided.droppableProps}
                    >
                        {performer.tasks.map((item, index) => (
                            <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                                {(provided, snapshot) => (
                                    <TaskCard item={item} provided={provided} snapshot={snapshot} performerLink={performer.uuid}/>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>}

    </div>;
}

export default PerformerRow;
