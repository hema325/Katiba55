import { ExecutionStatus } from "../../enums/execution-status.enum";

export interface WorkDetailed {
    id: number,
    name: string,
    startDate?: Date,
    endDate?: Date,
    executionPercent?: number,
    executionDate?: Date,
    executionStatus: ExecutionStatus,
    // responsible: CompanyBrief
}
