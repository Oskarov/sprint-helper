import React                            from 'react';
import {IPerformerItem}                 from "../../../../interfaces/IPerformers";
import {Draggable, Droppable}           from "react-beautiful-dnd";
import {inspect}                        from "util";
import styles                           from './performanceRow.module.scss';
import CN                               from 'classnames';
import {hourDefinition, maxSprintHours} from "../../../../App";
import TaskCard                         from "../../../../components/taskCard/taskCard";
import {useSelector}                    from "react-redux";
import {TStore}                         from "../../../../store/store";
import Ruler                            from "./ruler/ruler";
import Metrics                          from "./metrics/metrics";

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

    return <div className={styles.performer}>
        <div className={styles.titleRow}>
            <div className={styles.name}>{`${performer.lastName} ${performer.firstName}`}</div>
            <Metrics performer={performer}/>
        </div>
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
                                <TaskCard item={item} provided={provided} snapshot={snapshot}/>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>;
}

export default PerformerRow;
