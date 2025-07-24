import { ExecutionStatus } from "../../enums/execution-status.enum";
import { CompanyBrief } from "../companies/company-brief";

export interface WorkDetailed {
    id: number,
    name: string,
    estimatedStartDate?: Date,
    estimatedEndDate?: Date,
    actualStartDate?: Date,
    actualEndDate?: Date,
    totalValue?: number,
    executedValue?: number,
    relativeWeightPercent?: number,
    executionPercent?: number,
    relativeExecutionPercent?: number,
    executionDate?: Date,
    executionStatus: ExecutionStatus,
    notes?: string,
    responsible: CompanyBrief
}
