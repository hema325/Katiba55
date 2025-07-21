import { ExecutionStatus } from "../../enums/execution-status.enum";
import { CompanyBrief } from "../companies/company-brief";
import { WorkItem } from "../work-items/work-item";
import { WorkItemDetailed } from "../work-items/work-item-detailed";

export interface WorkDetailed {
    id: number,
    name: string,
    executionPercent?: number,
    executionDate?: Date,
    executionStatus: ExecutionStatus,
    totalContractValue?: number,
    notes?: string,
    responsible: CompanyBrief,
    workItems: WorkItemDetailed[]
}
