import React            from 'react';
import ListOfPerformers from "./listOfPerformers/listOfPerformers";
import Backlog          from "./backlog/backlog";
import styles           from "./main.module.scss";
import Control          from "./control/control";
import Settings         from "./settings/settings";

interface MainProps {

}

const Main: React.FC<MainProps> = ({}) => {
    return <div className={styles.main}>
        <ListOfPerformers/>
        <Backlog/>
        <Control/>
        <Settings/>
    </div>;
}

export default Main;
