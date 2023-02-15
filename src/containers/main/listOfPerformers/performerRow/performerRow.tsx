import React                  from 'react';
import {IPerformerItem}       from "../../../../interfaces/IPerformers";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {inspect}              from "util";
import styles                 from './performanceRow.module.scss';
import CN                               from 'classnames';
import {hourDefinition, maxSprintHours} from "../../../../App";

interface PerformerRowProps {
    performer: IPerformerItem
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'rgba(229,229,229,0.36)',
    display: 'flex',
    padding: 8,
    overflow: 'auto',
    width: `${maxSprintHours * hourDefinition}px`
});

const getItemStyle = (isDragging: boolean, draggableStyle: any, capacity: number) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 ${8}px 0 0`,
    width: `${capacity * hourDefinition}px`,
    // styles we need to apply on draggables
    ...draggableStyle,
});

const PerformerRow: React.FC<PerformerRowProps> = ({performer}) => {
    return <div className={styles.performer}>
        <div className={styles.titleRow}>
            <div className={styles.name}>{`${performer.lastName} ${performer.firstName}`}</div>
        </div>
        <Droppable droppableId={`${performer.uuid}`} direction="horizontal">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className={styles.listRow}
                    {...provided.droppableProps}
                >
                    {performer.tasks.map((item, index) => (
                        <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style,
                                        item.capacity
                                    )}
                                    className={CN(styles.task, {[styles.onDraw]: snapshot.isDragging})}
                                >
                                    <div className={styles.number}>{item.number}</div>
                                    <div className={styles.name}>{item.name}</div>
                                </div>
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
