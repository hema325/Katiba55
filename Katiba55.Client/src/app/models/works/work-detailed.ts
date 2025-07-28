import { ExecutionStatus } from "../../enums/execution-status.enum";
import { WorkCompanyDetailed } from "../work-companies/work.company-detailed";

export interface WorkDetailed {
    id: number,
    name: string,
    estimatedStartDate?: Date,
    estimatedEndDate?: Date,
    actualStartDate?: Date,
    actualEndDate?: Date,
    totalValue?: number,
    executedValue?: number,
    remainingValue?: number,
    relativeWeightPercent?: number,
    executionPercent?: number,
    executionDate?: Date,
    executionStatus: ExecutionStatus,
    notes?: string,
    workCompanies: WorkCompanyDetailed[]
}
