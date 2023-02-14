import {Dispatch}             from 'redux';
import {addPerformer}         from "../slices/performers";
import {generateRandomString} from "../utils/generateRandomString";

export const addPerformerAction = (firstName: string, lastName: string, roleId: number) => {
    return async function (dispatch: Dispatch<any>) {
        dispatch(addPerformer({firstName, lastName, roleId, uuid: generateRandomString(10), tasks: []}));
    }
}
