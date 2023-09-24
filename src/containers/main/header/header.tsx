import React                      from 'react';
import styles                     from './header.module.scss';
import AutoGraphIcon              from '@mui/icons-material/AutoGraph';
import {useDispatch, useSelector} from "react-redux";
import {setInformationOpen}       from "../../../slices/modal";
import {TStore}                   from "../../../store/store";
import {TASK_TYPES_ENUM}          from "../../../interfaces/ITask";
import {PERFORMER_TYPES_ENUM}     from "../../../interfaces/IPerformers";
import ToJson                     from "./toJson/toJson";
import FromJson                   from "./fromJson/fromJson";
import JiraStat                   from "./jiraStat/jiraStat";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    const dispatch = useDispatch();

    const {performers} = useSelector((state: TStore) => ({
        performers: state.performers.items,
    }));

    let performersSprintSize = 0;
    let performersSprintCount = 0;


    let performersProduct = 0;
    let performersProductCount = 0;
    let performersTechDebt = 0;
    let performersTechDebtCount = 0;
    let performersSupport = 0;
    let performersSupportCount = 0;

    let backendSprintSize = 0;
    let backendProduct = 0;
    let backendProductCount = 0;
    let backendTechDebt = 0;
    let backendTechDebtCount = 0;
    let backendSupport = 0;
    let backendSupportCount = 0;

    let frontendSprintSize = 0;
    let frontendProduct = 0;
    let frontendProductCount = 0;
    let frontendTechDebt = 0;
    let frontendTechDebtCount = 0;
    let frontendSupport = 0;
    let frontendSupportCount = 0;

    const tasksNumbers:string[] = [];
    performers.forEach(performer => {

        if (performer.roleId !== PERFORMER_TYPES_ENUM.TEAM_LEAD) {
            performer.tasks.forEach(task => {
                if (!tasksNumbers.includes(task.number)){
                    tasksNumbers.push(task.number);
                    if (task.type === TASK_TYPES_ENUM.BACKEND_TASK) {
                        performersProductCount++;
                        backendProductCount++;
                    }

                    if (task.type === TASK_TYPES_ENUM.BACKEND_TECH_DEBT) {
                        performersTechDebtCount++;
                        backendTechDebtCount++;
                    }

                    if (task.type === TASK_TYPES_ENUM.BACKEND_BUG) {
                        performersSupportCount++;
                        backendSupportCount++;
                    }


                    if (task.type === TASK_TYPES_ENUM.FRONTEND_TASK) {
                        performersProductCount++;
                        frontendProductCount++;
                    }

                    if (task.type === TASK_TYPES_ENUM.FRONTEND_TECH_DEBT) {
                        performersTechDebtCount++;
                        frontendTechDebtCount++;
                    }

                    if (task.type === TASK_TYPES_ENUM.FRONTEND_BUG) {
                        performersSupportCount++;
                        frontendSupportCount++;
                    }

                }

                performersSprintSize = performersSprintSize + task.capacity;
                performersSprintCount++;

                if (task.type === TASK_TYPES_ENUM.BACKEND_TASK) {
                    performersProduct = performersProduct + task.capacity;
                    backendProduct = backendProduct + task.capacity;
                    backendSprintSize = backendSprintSize + task.capacity;
                }

                if (task.type === TASK_TYPES_ENUM.BACKEND_TECH_DEBT) {
                    performersTechDebt = performersTechDebt + task.capacity;
                    backendSprintSize = backendSprintSize + task.capacity;
                    backendTechDebt = backendTechDebt + task.capacity;
                }

                if (task.type === TASK_TYPES_ENUM.BACKEND_BUG) {
                    performersSupport = performersSupport + task.capacity;
                    backendSprintSize = backendSprintSize + task.capacity;
                    backendSupport = backendSupport + task.capacity;
                }


                if (task.type === TASK_TYPES_ENUM.FRONTEND_TASK) {
                    performersProduct = performersProduct + task.capacity;
                    frontendProduct = frontendProduct + task.capacity;
                    frontendSprintSize = frontendSprintSize + task.capacity;
                }

                if (task.type === TASK_TYPES_ENUM.FRONTEND_TECH_DEBT) {
                    performersTechDebt = performersTechDebt + task.capacity;
                    frontendSprintSize = frontendSprintSize + task.capacity;
                    frontendTechDebt = frontendTechDebt + task.capacity;
                }

                if (task.type === TASK_TYPES_ENUM.FRONTEND_BUG) {
                    performersSupport = performersSupport + task.capacity;
                    frontendSprintSize = frontendSprintSize + task.capacity;
                    frontendSupport = frontendSupport + task.capacity;
                }


            })
        }
    })


    let showStat = () => {
        dispatch(setInformationOpen({
            modalTitle: 'Статистика',
            modalText: <div>
                <div><span>Вместимость спринта:</span><span>{performersSprintCount}/{performersSprintSize}</span></div>
                <hr/>
                <div>
                    <span>Вместимость спринта Backend:</span><span>{backendProductCount + backendTechDebtCount + backendSupportCount}/{backendSprintSize}</span>
                </div>
                <div><span>Backend Product:</span><span>{backendProductCount}/{backendProduct}</span></div>
                <div><span>Backend TechDebt:</span><span>{backendTechDebtCount}/{backendTechDebt}</span></div>
                <div><span>Backend Support:</span><span>{backendSupportCount}/{backendSupport}</span></div>
                <hr/>
                <div>
                    <span>Вместимость спринта frontend:</span><span>{frontendProductCount + frontendTechDebtCount + frontendSupportCount}/{frontendSprintSize}</span>
                </div>
                <div><span>frontend Product:</span><span>{frontendProductCount}/{frontendProduct}</span></div>
                <div><span>frontend TechDebt:</span><span>{frontendTechDebtCount}/{frontendTechDebt}</span></div>
                <div><span>frontend Support:</span><span>{frontendSupportCount}/{frontendSupport}</span></div>
                <hr/>
                <div>
                    <span>Общая вместимость спринта:</span><span>{frontendProductCount + frontendTechDebtCount + frontendSupportCount}/{frontendSprintSize}</span>
                </div>
                <div><span>Product:</span><span>{frontendProductCount + backendProductCount}/{frontendProduct + backendProduct}</span></div>
                <div><span>TechDebt:</span><span>{frontendTechDebtCount + backendTechDebtCount}/{frontendTechDebt + backendTechDebt}</span></div>
                <div><span>Support:</span><span>{frontendSupportCount + backendSupportCount}/{frontendSupport + backendSupport}</span></div>
            </div>
        }))
    }


    return <div className={styles.header}>
        <div className={styles.title}>Планирование спринта</div>
        <div className={styles.buttons}>
            <div onClick={showStat}>
                <AutoGraphIcon/>
            </div>
            <ToJson/>
            <FromJson/>
            <JiraStat/>
        </div>
    </div>;
}

export default Header;
