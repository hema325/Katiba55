import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaCategory'
})
export class MediaCategoryPipe implements PipeTransform {

  transform(category: any): any {
    switch (category) {
      case "TamatHadeed":
        return "تمام حديد";
      case "TamatAsment":
        return "تمام أسمنت";
      case "Ardh":
        return "عرض";
      case "MawqefMali":
        return "موقف مالي";
      case "MawqefTanfidhi":
        return "موقف تنفيذي";
      case "TawtheeqTanfidh":
        return "توثيق تنفيذ";
      default:
        return "فئة غير معروفة";
    }
  }
}
