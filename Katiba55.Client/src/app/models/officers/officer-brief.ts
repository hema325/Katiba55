import { OfficerRank } from "../../enums/officer-rank.enum"
import { OfficerStatus } from "../../enums/officer-status.enum"

export interface OfficerBrief {
    id: number
    name: string
    status: OfficerStatus
    rank: OfficerRank
}
