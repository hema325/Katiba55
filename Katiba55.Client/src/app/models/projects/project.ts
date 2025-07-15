import { ExecutionStatus } from "../../enums/execution-status.enum"

export interface Project {
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
    executionStatus: ExecutionStatus
    executionPercent?: number
    executionDate?: Date
    supervisorId: number
    notes?: string
}
