import { CompanyBrief } from "../companies/company-brief";
import { ContractDetailed } from "../contracts/contract-detailed";

export interface BoqDetailed {
    id: number;
    title: string;
    status: string;
    number: string;
    value?: number;
    company: CompanyBrief;
    contract: ContractDetailed;
}
