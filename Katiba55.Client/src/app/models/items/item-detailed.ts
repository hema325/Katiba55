export interface ItemDetailed {
    id: number;
    name: string;
    estimatedStartDate?: Date;
    estimatedEndDate?: Date;
    actualStartDate?: Date;
    actualEndDate?: Date;
    totalValue?: number;
    executedValue?: number;
    relativeWeightPercent?: number;
    executionPercent?: number;
    executionDate?: Date;
    relativeExecutionPercent?: number;
    executionStatus: string;
    notes?: string;
}
