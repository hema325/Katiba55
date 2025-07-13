import { Pipe, PipeTransform } from '@angular/core';
import { OfficerRank } from '../enums/officer-rank.enum';

@Pipe({
  name: 'officerRank'
})
export class OfficerRankPipe implements PipeTransform {

  transform(rank: any, args?: any): any {

    if (!rank)
      return null;

    switch (rank) {
      case OfficerRank.SecondLieutenant:
        return 'ملازم';
      case OfficerRank.FirstLieutenant:
        return 'ملازم أول';
      case OfficerRank.Captain:
        return 'نقيب';
      case OfficerRank.Major:
        return 'رائد';
      case OfficerRank.LieutenantColonel:
        return 'مقدم';
      case OfficerRank.Colonel:
        return 'عقيد';
      case OfficerRank.Brigadier:
        return 'عميد';
      case OfficerRank.MajorGeneral:
        return 'لواء';
      case OfficerRank.LieutenantGeneral:
        return 'فريق';
      case OfficerRank.General:
        return 'فريق أول';
      case OfficerRank.FieldMarshal:
        return 'مشير';
      default:
        return 'رتبة غير معروفة';
    }

  }

}
