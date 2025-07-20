import { ExecutionStatus } from "../../enums/execution-status.enum";

export interface Work {
    id: number,
    name: string,
    startDate?: Date,
    endDate?: Date,
    executionPercent?: number,
    executionDate?: Date,
    executionStatus: ExecutionStatus,
    responsibleId?: number,
    projectId: number,
}
