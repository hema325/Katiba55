export interface ProjectsReport {
    totalProjects: number;
    pendingProjects: number;
    onHoldProjects: number;
    underconstructionProjects: number;
    completedProjects: number;
    cancelledProjects: number;
    totalExecutionPercent: number;
    averageExecutionPercent: number;
    startPercent: number;
}
