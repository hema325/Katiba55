import { BoqDetailed } from "../boqs/boq-detailed";
import { CompanyBrief } from "../companies/company-brief";

export interface WorkWithDetailedBoq {
    id: number;
    name: string;
    boQs: BoqDetailed[];
}
