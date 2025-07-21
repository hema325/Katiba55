import { ExecutionStatus } from "../../enums/execution-status.enum";
import { CompanyBrief } from "../companies/company-brief";

export interface WorkDetailed {
    id: number,
    name: string,
    executionPercent?: number,
    executionDate?: Date,
    executionStatus: ExecutionStatus,
    totalContractValue?: number,
    notes?: string,
    responsible: CompanyBrief
}
