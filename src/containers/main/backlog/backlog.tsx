import React                            from 'react';
import styles                           from './backlog.module.scss';
import {Draggable, Droppable}           from "react-beautiful-dnd";
import CN                               from "classnames";
import {hourDefinition, maxSprintHours} from "../../../App";
import {useSelector}                    from "react-redux";
import {TStore}                         from "../../../store/store";
import {TASK_TYPES_ENUM}                from "../../../interfaces/ITask";

interface BacklogProps {

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
    margin: `2px 0`,
    width: `${capacity * hourDefinition}px`,
    // styles we need to apply on draggables
    ...draggableStyle,
});

const Backlog: React.FC<BacklogProps> = ({}) => {
    const {tasks} = useSelector((state: TStore) => ({
        tasks: state.tasks.items,
    }));

    return <div>
        <div className={styles.title}>Бэклог продукта</div>
        <Droppable droppableId={`backlog`} direction="vertical">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className={styles.listRow}
                    {...provided.droppableProps}
                >
                    {tasks.map((item, index) => (
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
                                    className={CN(styles.task, {
                                        [styles.onDraw]: snapshot.isDragging,
                                        [styles.review]: item.type === TASK_TYPES_ENUM.REVIEW,
                                        [styles.meetings]: item.type === TASK_TYPES_ENUM.MEETINGS,
                                        [styles.backendTask]: item.type === TASK_TYPES_ENUM.BACKEND_TASK,
                                        [styles.backendBug]: item.type === TASK_TYPES_ENUM.BACKEND_BUG,
                                        [styles.backendTechDebt]: item.type === TASK_TYPES_ENUM.BACKEND_TECH_DEBT,
                                        [styles.frontendTask]: item.type === TASK_TYPES_ENUM.FRONTEND_TASK,
                                        [styles.frontendBug]: item.type === TASK_TYPES_ENUM.FRONTEND_BUG,
                                        [styles.frontendTechDebt]: item.type === TASK_TYPES_ENUM.FRONTEND_TECH_DEBT,
                                    })}
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

export default Backlog;
