import React, {useState}                                   from 'react';
import {Checkbox, Dialog, DialogContent, TextareaAutosize} from "@mui/material";
import styles
                                                           from "../../../../components/reduxInformationDialog/index.module.scss";
import CloseIcon                                           from "@mui/icons-material/Close";
import Button                                              from "@mui/material/Button";
import TrackChangesIcon                                    from '@mui/icons-material/TrackChanges';
import innerStyle                                          from './jiraStat.module.scss';
import {IJiraIssues}                                       from "../../../../interfaces/IJira";
import CN                                                  from "classnames";

interface JiraStatProps {

}

interface problemTask {
    key: string
}

const defaultStatuses = ['done', 'готово', 'готово для теста qa', 'ожидает релиза' , 'релиз', 'готово для теста', 'integration test', 'тест', 'тестирование',  'ready for release', 'rs testing', 'release stand', 'ready for release', 'feature review', 'testing', 'ready for test', 'test in progress', 'ux/ui review', 'build', 'integration test', 'ready for deployment', 'ready for ox', 'ready for rs', 'business approve', 'cancelled', 'ready for build', 'build', 'integration test', 'ready for deployment', 'test review'];

const JiraStat: React.FC<JiraStatProps> = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const [endStatuses, setEndStatuses] = useState(defaultStatuses);

    const [onlyDone, setOnlyDone] = useState(false);

    const [showResult, setShowResult] = useState(false);

    const [productTasksCount, setProductTasksCount] = useState(0);
    const [techDebtTasksCount, setTechDebtTasksCount] = useState(0);
    const [supportTasksCount, setSupportTasksCount] = useState(0);

    const [productTasksCountComplete, setProductTasksCountComplete] = useState(0);
    const [techDebtTasksCountComplete, setTechDebtTasksCountComplete] = useState(0);
    const [supportTasksCountComplete, setSupportTasksCountComplete] = useState(0);

    const [withoutLabels, setWithoutLabels] = useState<problemTask[]>([]);
    const [withoutTime, setWithoutTime] = useState<problemTask[]>([]);

    const [productTasksTime, setProductTasksTime] = useState(0);
    const [techDebtTasksTime, setTechDebtTasksTime] = useState(0);
    const [supportTasksTime, setSupportTasksTime] = useState(0);

    const [productTasksTimeComplete, setProductTasksTimeComplete] = useState(0);
    const [techDebtTasksTimeComplete, setTechDebtTasksTimeComplete] = useState(0);
    const [supportTasksTimeComplete, setSupportTasksTimeComplete] = useState(0);

    const [totalCount, setTotalCount] = useState(0);


    const handleImport = () => {
        if (value) {
            clearData();
            const jsoned = JSON.parse(value);
            parseJiraJson(jsoned as IJiraIssues);
            setShowResult(true);
        }
    }

    const clearData = () => {
        setProductTasksCount(0);
        setTechDebtTasksCount(0);
        setSupportTasksCount(0);
        setProductTasksCountComplete(0);
        setTechDebtTasksCountComplete(0);
        setSupportTasksCountComplete(0);

        setWithoutLabels([]);
        setWithoutTime([]);

        setProductTasksTime(0);
        setTechDebtTasksTime(0);
        setSupportTasksTime(0);
        setProductTasksTimeComplete(0);
        setTechDebtTasksTimeComplete(0);
        setSupportTasksTimeComplete(0);

        setTotalCount(0);
    }

    const parseJiraJson = (obj: IJiraIssues) => {
        obj.issues.forEach((task, idx) => {
            const taskTime = task.fields.aggregatetimeoriginalestimate ? task.fields.aggregatetimeoriginalestimate / 60 / 60 : 0;
            const taskLabels = task.fields.labels;
            let label = '';

            taskLabels.forEach(labelItem => {
                if (['TechDebt', 'techDebt', 'techdebt', 'tech-debt'].includes(labelItem)) {
                    label = 'TechDebt';
                }
                if (['Product', 'product'].includes(labelItem)) {
                    label = 'Product';
                }
                if (['Support', 'support'].includes(labelItem)) {
                    label = 'Support';
                }
            });

            let timeForTask = task.fields.worklog.worklogs.reduce((time, item) => (time + (!!item.timeSpentSeconds ? item.timeSpentSeconds / 60 / 60 : 0)), 0)

            switch (label) {
                case 'TechDebt':
                    setTechDebtTasksCount(state => state + 1);
                    setTechDebtTasksTime(state => state + taskTime);
                    if (endStatuses.includes(task.fields.status.name.toLowerCase())) {
                        setTechDebtTasksCountComplete(state => state + 1);
                    }
                    setTechDebtTasksTimeComplete(state => state + timeForTask);
                    break;
                case 'Product':
                    setProductTasksCount(state => state + 1);
                    setProductTasksTime(state => state + taskTime);
                    if (endStatuses.includes(task.fields.status.name.toLowerCase())) {
                        setProductTasksCountComplete(state => state + 1);
                    }
                    setProductTasksTimeComplete(state => state + timeForTask);
                    break;
                case 'Support':
                    setSupportTasksCount(state => state + 1);
                    setSupportTasksTime(state => state + taskTime);
                    if (endStatuses.includes(task.fields.status.name.toLowerCase())) {
                        setSupportTasksCountComplete(state => state + 1);
                    }
                    setSupportTasksTimeComplete(state => state + timeForTask);
                    break;
            }
            if (!label) {
                setWithoutLabels(state => [...state, {
                    key: task.key
                }])
            }
            if (!taskTime) {
                setWithoutTime(state => [...state, {
                    key: task.key
                }])
            }
            setTotalCount(state => state + 1)
        })
    }

    return <div>
        <div onClick={() => setIsOpen(true)}>
            <TrackChangesIcon/>
        </div>
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="simple-dialog-title"
            aria-describedby="simple-dialog-description"
            className="tms"
        >
            <DialogContent className={CN(styles.content, styles.big)}>
                <div className={styles.roundButton} onClick={() => setIsOpen(false)}>
                    <CloseIcon/>
                </div>
                <div className={styles.title}>Загрузить JSON JIRA</div>
                <div className={styles.onlyDone}>
                    <Checkbox
                        name={'onlyDone'}
                        onChange={(event, checked) => {
                            setOnlyDone(checked);
                            if (checked) {
                                setEndStatuses(['done', 'готово']);
                            } else {
                                setEndStatuses(defaultStatuses);
                            }
                        }
                        }
                        checked={onlyDone}
                    />
                    Только в статусе "Готово"
                </div>
                <TextareaAutosize className={styles.area}
                                  onChange={(e) => setValue(e.target.value)}
                                  value={value}/>
                <Button onClick={handleImport}>Загрузить</Button>

                {showResult && <div className={innerStyle.cont}>
                    <div className={innerStyle.title}>Результат ({totalCount} задач)</div>

                    {!!withoutLabels.length && <div className={innerStyle.problem}>
                        Без бакета: <span>{withoutLabels.map(label => <span
                        key={label.key}>{label.key}<span>,</span> </span>)}</span>
                    </div>}

                    {!!withoutTime.length && <div className={innerStyle.problem}>
                        Без времени: <span>{withoutTime.map(label => <span
                        key={label.key}>{label.key}<span>,</span> </span>)}</span>
                    </div>}

                    <div className={innerStyle.table}>
                        <div className={innerStyle.inner}>
                            <div className={innerStyle.title}>Planned hours</div>
                            <div className={innerStyle.th}>
                                <div><span>Product</span></div>
                                <div><span>TechDebt</span></div>
                                <div><span>Support</span></div>
                            </div>
                            <div className={innerStyle.values}>
                                <div>{Math.round(productTasksTime)}</div>
                                <div>{Math.round(techDebtTasksTime)}</div>
                                <div>{Math.round(supportTasksTime)}</div>
                            </div>
                        </div>
                        <div className={innerStyle.inner}>
                            <div className={innerStyle.title}>Logged hours</div>
                            <div className={innerStyle.th}>
                                <div><span>Product</span></div>
                                <div><span>TechDebt</span></div>
                                <div><span>Support</span></div>
                            </div>
                            <div className={innerStyle.values}>
                                <div>{Math.round(productTasksTimeComplete)}</div>
                                <div>{Math.round(techDebtTasksTimeComplete)}</div>
                                <div>{Math.round(supportTasksTimeComplete)}</div>
                            </div>
                        </div>
                        <div className={innerStyle.inner}>
                            <div className={innerStyle.title}>Planned issues</div>
                            <div className={innerStyle.th}>
                                <div><span>Product</span></div>
                                <div><span>TechDebt</span></div>
                                <div><span>Support</span></div>
                            </div>
                            <div className={innerStyle.values}>
                                <div>{productTasksCount}</div>
                                <div>{techDebtTasksCount}</div>
                                <div>{supportTasksCount}</div>
                            </div>
                        </div>
                        <div className={innerStyle.inner}>
                            <div className={innerStyle.title}>Completed issues</div>
                            <div className={innerStyle.th}>
                                <div><span>Product</span></div>
                                <div><span>TechDebt</span></div>
                                <div><span>Support</span></div>
                            </div>
                            <div>
                                <div className={innerStyle.values}>
                                    <div>{productTasksCountComplete}</div>
                                    <div>{techDebtTasksCountComplete}</div>
                                    <div>{supportTasksCountComplete}</div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>}
            </DialogContent>


        </Dialog>
    </div>;
}

export default JiraStat;
