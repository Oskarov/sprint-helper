import {performersReducer} from "../slices/performers";
import {tasksReducer}      from "../slices/tasks";

const reducer = {
    performers: performersReducer,
    tasks: tasksReducer
};
export default reducer;
