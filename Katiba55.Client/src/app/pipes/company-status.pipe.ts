import { Pipe, PipeTransform } from '@angular/core';
import { CompanyStatus } from '../enums/company-status.enum';

@Pipe({
  name: 'companyStatus'
})
export class CompanyStatusPipe implements PipeTransform {

  transform(status: any,): any {
    switch (status) {
      case CompanyStatus.Unapproved:
        return 'غير معتمدة';
      case CompanyStatus.Approved:
        return 'معتمدة';
      default:
        return 'حالة غير معروفة';
    }
  }

}
