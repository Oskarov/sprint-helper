import React                            from 'react';
import styles                           from './backlog.module.scss';
import {Draggable, Droppable}           from "react-beautiful-dnd";
import CN                               from "classnames";
import {hourDefinition, maxSprintHours} from "../../../App";
import {useSelector}                    from "react-redux";
import {TStore}                         from "../../../store/store";
import {TASK_TYPES_ENUM}                from "../../../interfaces/ITask";
import TaskCard                         from "../../../components/taskCard/taskCard";

interface BacklogProps {

}

const getListStyle = (isDraggingOver: boolean, rowSize: number,
                      sprintSize: number,
                      valueOfDivision: number) => ({
    background: isDraggingOver ? 'lightblue' : 'rgba(229,229,229,0.36)',
    display: 'flex',
    padding: 8,
    overflow: 'auto',
    width: `${rowSize * valueOfDivision}px`
});

const Backlog: React.FC<BacklogProps> = () => {
    const {tasks, app} = useSelector((state: TStore) => ({
        tasks: state.tasks.items,
        app: state.app
    }));

    return <div className={styles.list}>
        <div className={styles.title}>Бэклог продукта</div>
        <Droppable droppableId={`backlog`} direction="horizontal">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver,  app.rowSize, app.sprintSize, app.valueOfDivision)}
                    className={styles.listRow}
                    {...provided.droppableProps}
                >
                    {tasks.map((item, index) => (
                        <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                            {(provided, snapshot) => (
                                <TaskCard item={item} provided={provided} snapshot={snapshot} performerLink="backlog"/>
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
