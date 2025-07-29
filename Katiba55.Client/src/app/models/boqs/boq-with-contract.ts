import { ContractDetailed } from "../contracts/contract-detailed";

export interface BoqWithContract {
    id: number;
    title: string;
    status: string;
    number: string;
    value?: number;
    contract: ContractDetailed;
}
