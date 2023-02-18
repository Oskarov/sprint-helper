import { IPerformerItem } from "./IPerformers";
import { ITask } from "./ITask";

export interface IJsonForExport {
    performers: IPerformerItem[],
    tasks: ITask[]
}