import React             from 'react';
import {useSelector}     from "react-redux";
import {TStore}          from "../../../../../store/store";
import {TASK_TYPES_ENUM} from "../../../../../interfaces/ITask";
import styles            from './ruler.module.scss';

interface RullerProps {
    performerUuid: string
}

const getRulerStyle = (sprintSize: number, valueOfDivision: number) => ({
    width: `${sprintSize * valueOfDivision}px`
});

const getPaddingStyle = (taskCapacity: number, valueOfDivision: number) => ({
    width: `${+taskCapacity * valueOfDivision}px`
})

const Ruler: React.FC<RullerProps> = ({performerUuid}) => {
    const {tasks, app} = useSelector((state: TStore) => ({
        tasks: state.performers.items.find(i => i.uuid === performerUuid)?.tasks.filter(i => [TASK_TYPES_ENUM.REVIEW, TASK_TYPES_ENUM.MEETINGS, TASK_TYPES_ENUM.VACATION, TASK_TYPES_ENUM.HOLLYDAYS].includes(i.type)),
        app: state.app
    }));

    const tasksCapacity = tasks ? tasks.reduce((i, j) => +i + +j.capacity, 0) : 0;

    return <div className={styles.ruler} style={getRulerStyle(app.sprintSize, app.valueOfDivision)}>
        <div className={styles.padding} style={getPaddingStyle(tasksCapacity, app.valueOfDivision)}/>
        <div className={styles.baskets}>
            <div className={styles.product}/>
            <div className={styles.techdebt}/>
            <div className={styles.support}/>
        </div>
    </div>;
}

export default Ruler;
