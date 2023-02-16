import {performersReducer} from "../slices/performers";
import {tasksReducer}      from "../slices/tasks";
import {appReducer}        from "../slices/app";

const reducer = {
    performers: performersReducer,
    tasks: tasksReducer,
    app: appReducer
};
export default reducer;
