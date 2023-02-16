import React                                       from 'react';
import CN                                          from "classnames";
import styles                                      from "./taskCard.module.scss";
import {ITask, TASK_TYPES_ENUM}                    from "../../interfaces/ITask";
import {DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import {hourDefinition}                            from "../../App";
import VisibilityIcon                              from '@mui/icons-material/Visibility';
import GroupsIcon                                  from '@mui/icons-material/Groups';
import KayakingIcon                                from '@mui/icons-material/Kayaking';
import CelebrationIcon                             from '@mui/icons-material/Celebration';
import {useSelector}                               from "react-redux";
import {TStore}                                    from "../../store/store";
import {Tooltip}                                   from "@mui/material";

interface TaskCardProps {
    item: ITask,
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot
}

const getItemStyle = (isDragging: boolean, draggableStyle: any, capacity: number, valueOfDivision: number) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 0,
    margin: `2px 0`,
    width: `${capacity * valueOfDivision}px`,
    // styles we need to apply on draggables
    ...draggableStyle,
});

const TaskCard: React.FC<TaskCardProps> = ({item, provided, snapshot}) => {
    const {app} = useSelector((state: TStore) => ({
        app: state.app
    }));

    return <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            item.capacity,
            app.valueOfDivision
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
            [styles.vacation]: item.type === TASK_TYPES_ENUM.VACATION,
            [styles.hollydays]: item.type === TASK_TYPES_ENUM.HOLLYDAYS,
        })}
    >

        {item.type === TASK_TYPES_ENUM.REVIEW && <div className={styles.centerIcon}>
            <Tooltip title={`Код ревью (${item.capacity})`}>
                <VisibilityIcon/>
            </Tooltip>
        </div>}
        {item.type === TASK_TYPES_ENUM.MEETINGS && <div className={styles.centerIcon}>
            <Tooltip title={`Встречи (${item.capacity})`}>
                <GroupsIcon/>
            </Tooltip>
        </div>}
        {item.type === TASK_TYPES_ENUM.VACATION && <div className={styles.centerIcon}>
            <Tooltip title={`Отпуск (${item.capacity})`}>
                <KayakingIcon/>
            </Tooltip>
        </div>}
        {item.type === TASK_TYPES_ENUM.HOLLYDAYS && <div className={styles.centerIcon}>
            <Tooltip title={`Выходные (${item.capacity})`}>
                <CelebrationIcon/>
            </Tooltip>
        </div>}
        {![TASK_TYPES_ENUM.MEETINGS, TASK_TYPES_ENUM.REVIEW, TASK_TYPES_ENUM.VACATION, TASK_TYPES_ENUM.HOLLYDAYS].includes(item.type) &&
        <div>
            <div className={styles.number}><a href={`https://jira.eapteka.ru/browse/${item.number}`}
                                              target={"_blank"}>{item.number}</a></div>
            <div className={styles.name}>
                <Tooltip title={`${item.number} ${item.name} (${item.capacity})`}>
                    <span>{item.name}</span>
                </Tooltip>
            </div>
        </div>}

    </div>;
}

export default TaskCard;
