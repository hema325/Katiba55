import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatus } from '../enums/project-status.enum';

@Pipe({
  name: 'projectStatus'
})
export class ProjectStatusPipe implements PipeTransform {

  transform(status: any): string {
    switch (status) {
      case ProjectStatus.Pending:
        return 'لم يبدأ';
      case ProjectStatus.OnHold:
        return 'متوقف';
      case ProjectStatus.Underconstruction:
        return 'قيد الإنشاء';
      case ProjectStatus.Completed:
        return 'مكتمل';
      case ProjectStatus.Cancelled:
        return 'ملغى';
      default:
        return 'غير معروف';
    }
  }
}
