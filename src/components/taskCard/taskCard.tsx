import React                                       from 'react';
import CN                                          from "classnames";
import styles                                      from "./taskCard.module.scss";
import {ITask, TASK_TYPES_ENUM, taskTypes}         from "../../interfaces/ITask";
import {DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import {hourDefinition}                            from "../../App";
import VisibilityIcon                              from '@mui/icons-material/Visibility';
import GroupsIcon                                  from '@mui/icons-material/Groups';
import KayakingIcon                                from '@mui/icons-material/Kayaking';
import CelebrationIcon                             from '@mui/icons-material/Celebration';
import {useDispatch, useSelector}                  from "react-redux";
import {TStore}                                    from "../../store/store";
import {Menu, MenuItem, Tooltip}                   from "@mui/material";
import TaskMenu                                    from "./menu/menu";
import {clearTargetTask, setTargetTask}            from "../../slices/modal";

interface TaskCardProps {
    item: ITask,
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
    performerLink: string
}

const getItemStyle = (isDragging: boolean, draggableStyle: any, capacity: number, valueOfDivision: number) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 0,
    margin: `2px 0`,
    width: `${capacity * valueOfDivision}px`,
    cursor: 'context-menu',
    // styles we need to apply on draggables
    ...draggableStyle,
});

const TaskCard: React.FC<TaskCardProps> = ({item, provided, snapshot, performerLink}) => {
    const {app, targetTask} = useSelector((state: TStore) => ({
        app: state.app,
        targetTask: state.modal.targetTask
    }));
    const dispatch = useDispatch();

    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : null,
        );
    };

    const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        // eslint-disable-next-line no-console
        console.log(e)
    }


    return <div
        onMouseOver={(e) => {
            dispatch(setTargetTask(item.number));
        }}
        onMouseOut={(e) => {
            dispatch(clearTargetTask());
        }}
        onContextMenu={handleContextMenu}
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
            [styles.targetTask]: (targetTask === item.number) && ![TASK_TYPES_ENUM.MEETINGS, TASK_TYPES_ENUM.REVIEW, TASK_TYPES_ENUM.VACATION, TASK_TYPES_ENUM.HOLLYDAYS].includes(item.type),
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
                                              target={"_blank"} rel={"noreferrer`"}>{item.number}</a></div>
            <div className={styles.name}>
                <Tooltip title={`${item.number} ${item.name} (${item.capacity})`}>
                    <span>{item.name}</span>
                </Tooltip>
            </div>

        </div>}
        <TaskMenu contextMenu={contextMenu} setContextMenu={setContextMenu} performerLink={performerLink} task={item}/>
    </div>;

}

export default TaskCard;
