import { ExecutionStatus } from "src/app/enums/execution-status.enum"

export interface ProjectBrief {
    id: number
    name: string
    executionPercent?: number
    executionDate?: Date
    executionStatus: ExecutionStatus
}
