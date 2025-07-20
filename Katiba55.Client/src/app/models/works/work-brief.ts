import { ExecutionStatus } from "../../enums/execution-status.enum";

export interface WorkBrief {
    id: number,
    name: string,
    executionPercent?: number,
    executionDate?: Date,
    executionStatus: ExecutionStatus,
}
