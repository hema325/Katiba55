import { BoqWithContract } from "../boqs/boq-with-contract";

export interface CompanyWithBoqs {
    id: number,
    name: string;
    boQs: BoqWithContract[]
}
