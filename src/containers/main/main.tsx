import React            from 'react';
import ListOfPerformers from "./listOfPerformers/listOfPerformers";
import Backlog          from "./backlog/backlog";
import styles           from "./main.module.scss";
import Control          from "./control/control";

interface MainProps {

}

const Main: React.FC<MainProps> = ({}) => {
    return <div className={styles.main}>
        <ListOfPerformers/>
        <Backlog/>
        <Control/>
    </div>;
}

export default Main;
