import { Invoice } from "../invoices/invoice";

export interface ContractDetailed {
    id: number;
    status: string;
    number: string;
    value: number;
    invoices: Invoice[];
}
