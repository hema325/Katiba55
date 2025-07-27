export interface Item {
    id: number;
    name: string;
    estimatedStartDate?: Date;
    estimatedEndDate?: Date;
    actualStartDate?: Date;
    actualEndDate?: Date;
    totalValue?: number;
    executedValue?: number;
    remainingValue?: number;
    relativeWeightPercent?: number;
    executionPercent?: number;
    executionDate?: Date;
    executionStatus: string;
    notes?: string;
}
