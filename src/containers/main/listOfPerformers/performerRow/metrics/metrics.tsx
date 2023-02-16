import React             from 'react';
import {IPerformerItem}  from "../../../../../interfaces/IPerformers";
import {TASK_TYPES_ENUM} from "../../../../../interfaces/ITask";
import {useSelector}     from "react-redux";
import {TStore}          from "../../../../../store/store";
import styles            from './metrics.module.scss';

interface MetricsProps {
    performer: IPerformerItem
}

const Metrics: React.FC<MetricsProps> = ({performer}) => {

    const {app} = useSelector((state: TStore) => ({
        app: state.app,
    }));

    let noWorking = 0;
    let product = 0;
    let techdebt = 0;
    let support = 0;

    performer.tasks.forEach(task => {
        if ([TASK_TYPES_ENUM.MEETINGS, TASK_TYPES_ENUM.REVIEW, TASK_TYPES_ENUM.VACATION, TASK_TYPES_ENUM.HOLLYDAYS].includes(task.type)) {
            noWorking = noWorking + task.capacity;
        }
        if ([TASK_TYPES_ENUM.FRONTEND_TASK, TASK_TYPES_ENUM.BACKEND_TASK].includes(task.type)) {
            product = product + task.capacity
        }
        if ([TASK_TYPES_ENUM.FRONTEND_BUG, TASK_TYPES_ENUM.BACKEND_BUG].includes(task.type)) {
            support = support + task.capacity
        }
        if ([TASK_TYPES_ENUM.FRONTEND_TECH_DEBT, TASK_TYPES_ENUM.BACKEND_TECH_DEBT].includes(task.type)) {
            techdebt = techdebt + task.capacity
        }
    });

    const sprintSize = app.sprintSize - noWorking;
    return <div className={styles.metrics}>(
        <div className={styles.product}>{product}/{Math.round(sprintSize * 0.70)}</div>-
        <div className={styles.techdebt}>{techdebt}/{Math.round(sprintSize * 0.20)}</div>
        -
        <div className={styles.support}>{support}/{Math.round(sprintSize * 0.10)}</div>
        )
    </div>;
}

export default Metrics;
