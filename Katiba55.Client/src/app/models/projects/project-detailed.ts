import { ExecutionStatus } from "../../enums/execution-status.enum"
import { OfficerBrief } from "../officers/officer-brief"

export interface ProjectDetailed {
    id: number
    name: string
    executingSide?: string
    benefitingSide?: string
    estimatedCost?: number
    financialAllocation?: number
    estimatedStartDate?: Date
    estimatedEndDate?: Date
    actualStartDate?: Date
    actualEndDate?: Date
    address?: string
    latitude?: number
    longitude?: number
    status: ExecutionStatus
    executionPercent?: number
    executionDate?: Date
    supervisor: OfficerBrief
    notes?: string
}
