import { ExecutionStatus } from "../../enums/execution-status.enum";

export interface Work {
    id: number,
    name: string,
    startDate?: Date,
    endDate?: Date,
    estimatedStartDate?: Date
    estimatedEndDate?: Date
    actualStartDate?: Date
    actualEndDate?: Date
    totalValue?: number,
    executedValue?: number,
    relativeWeightPercent?: number,
    executionPercent?: number,
    relativeExecutionPercent?: number,
    executionDate?: Date,
    executionStatus: ExecutionStatus,
    responsibleId?: number,
    projectId: number,
    notes?: string,
}
