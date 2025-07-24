import { ExecutionStatus } from "../../enums/execution-status.enum";
import { ItemBrief } from "../items/item-brief";

export interface WorkWithItemsBrief {
    id: number;
    name: string;
    executionPercent?: number;
    executionDate?: Date;
    executionStatus: ExecutionStatus;
    items: ItemBrief[];
}
