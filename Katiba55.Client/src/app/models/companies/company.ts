import { CompanyStatus } from "../../enums/company-status.enum"

export interface Company {
    id: number
    name: string
    representativeName?: string
    email?: string
    phone?: string
    status: CompanyStatus
    address?: string
    latitude?: number
    longitude?: number
    approvalImagePath?: string
    notes?: string
}
