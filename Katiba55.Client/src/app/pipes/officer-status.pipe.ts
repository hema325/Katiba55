import { Pipe, PipeTransform } from '@angular/core';
import { OfficerStatus } from '../enums/officer-status.enum';

@Pipe({
  name: 'officerStatus'
})
export class OfficerStatusPipe implements PipeTransform {

  transform(status: any): any {

    if (!status)
      return null;

    switch (status) {
      case OfficerStatus.InBattalion:
        return 'قوة الكتيبة';
      case OfficerStatus.OutBattalion:
        return 'ليس قوة الكتيبة';
      default:
        return 'حالة غير معروفة';
    }
  }

}
