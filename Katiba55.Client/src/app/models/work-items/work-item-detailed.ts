import { Item } from "../items/item";

export interface WorkItemDetailed {
    id: number,
    totalValue: number,
    executedValue: number,
    relativeWeight: number,
    executionPercent: number,
    executionDate: Date | null,
    executionStatus: string,
    item: Item,
}
