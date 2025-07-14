import { CompanyStatus } from "../../enums/company-status.enum"

export interface CompanyBrief {
    id: number
    name: string
    status: CompanyStatus
}
