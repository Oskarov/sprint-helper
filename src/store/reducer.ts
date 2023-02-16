import {performersReducer} from "../slices/performers";
import {tasksReducer}      from "../slices/tasks";
import {appReducer}        from "../slices/app";
import {modalReducer}      from "../slices/modal";

const reducer = {
    performers: performersReducer,
    tasks: tasksReducer,
    app: appReducer,
    modal: modalReducer
};
export default reducer;
