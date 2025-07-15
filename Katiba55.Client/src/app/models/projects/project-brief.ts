import { ProjectStatus } from "../../enums/project-status.enum"

export class ProjectBrief {
    id: number
    name: string
    executionPercent?: number
    executionDate?: Date
    status: ProjectStatus
}
