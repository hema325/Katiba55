import { ExecutionStatus } from '../enums/execution-status.enum';

export function getExecutionStatusBadgeColor(status: any): string {
    switch (status) {
        case ExecutionStatus.Pending:
            return 'secondary';
        case ExecutionStatus.OnHold:
            return 'danger';
        case ExecutionStatus.Underconstruction:
            return 'warning';
        case ExecutionStatus.Completed:
            return 'success';
        case ExecutionStatus.Cancelled:
            return 'danger';
        default:
            return 'info';
    }
}

export function getExecutionProgressColor(percent: number): string {
    if (percent >= 85) return 'success';
    if (percent >= 50) return 'info';
    if (percent >= 25) return 'warning';
    if (percent > 0) return 'danger';
    return 'secondary';
}
