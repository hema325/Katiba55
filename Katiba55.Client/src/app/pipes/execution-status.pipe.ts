import { Pipe, PipeTransform } from '@angular/core';
import { ExecutionStatus } from '../enums/execution-status.enum';

@Pipe({
  name: 'executionStatus'
})
export class ExecutionStatusPipe implements PipeTransform {

  transform(status: any): string {
    switch (status) {
      case ExecutionStatus.Pending:
        return 'لم يبدأ';
      case ExecutionStatus.OnHold:
        return 'متوقف';
      case ExecutionStatus.Underconstruction:
        return 'قيد الإنشاء';
      case ExecutionStatus.Completed:
        return 'مكتمل';
      case ExecutionStatus.Cancelled:
        return 'ملغى';
      default:
        return 'غير معروف';
    }
  }
}
