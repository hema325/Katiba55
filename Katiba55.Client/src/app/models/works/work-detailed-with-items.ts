import { ExecutionStatus } from "../../enums/execution-status.enum";
import { CompanyBrief } from "../companies/company-brief";
import { ItemBrief } from "../items/item-brief";
import { ItemDetailed } from "../items/item-detailed";

export interface WorkDetailedWithItems {
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
    responsible: CompanyBrief,
    items: ItemDetailed[]
}
