import { ProjectStatus } from "../../enums/project-status.enum"
import { OfficerBrief } from "../officers/officer-brief"

export class ProjectDetailed {
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
    supervisor: OfficerBrief
    notes?: string
}
