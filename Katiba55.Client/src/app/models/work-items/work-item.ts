export interface WorkItem {
    id: number,
    totalValue: number,
    executedValue: number,
    relativeWeight: number,
    executionPercent: number,
    executionDate: Date | null,
    executionStatus: string,
    workId: number,
    itemId: number,
}
