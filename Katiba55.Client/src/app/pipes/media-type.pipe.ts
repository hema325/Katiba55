import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaType'
})
export class MediaTypePipe implements PipeTransform {

  transform(mediaType: any): any {
    switch (mediaType) {
      case "Image":
        return "صورة";
      case "Video":
        return "فيديو";
      case "Pdf":
        return "PDF";
      case "Word":
        return "Word";
      case "Excel":
        return "Excel";
      default:
        return "نوع غير معروف";
    }
  }

}
