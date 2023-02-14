import React                  from 'react';
import {IPerformerItem}       from "../../../../interfaces/IPerformers";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {inspect}              from "util";
import styles                 from './performanceRow.module.scss';

interface PerformerRowProps {
    performer: IPerformerItem
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: 8,
    overflow: 'auto',
});

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 ${8}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const PerformerRow: React.FC<PerformerRowProps> = ({performer}) => {
    return <div>
        <Droppable droppableId="droppable" direction="horizontal">
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
                                        provided.draggableProps.style
                                    )}
                                >
                                    {item.name}
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
