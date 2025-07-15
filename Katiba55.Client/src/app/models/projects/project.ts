import { ProjectStatus } from "../../enums/project-status.enum"

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
    status: ProjectStatus
    executionPercent?: number
    executionDate?: Date
    supervisorId: number
    notes?: string
}
