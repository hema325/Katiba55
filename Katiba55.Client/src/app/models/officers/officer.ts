import { OfficerRank } from "../../enums/officer-rank.enum"
import { OfficerStatus } from "../../enums/officer-status.enum"

export interface Officer {
    id: number
    name: string
    email?: string
    phone?: string
    rank: OfficerRank
    status: OfficerStatus
    joinDate?: Date
    leaveDate?: Date
    notes?: string
}
