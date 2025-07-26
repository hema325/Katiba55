import { Component, inject, Input, OnInit } from '@angular/core';
import { BOQsService } from '../../../../services/BOQs.service';
import { BoqDetailed } from '../../../../models/boqs/boq-detailed';
import { finalize, first } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.css'],
  imports: [
    DecimalPipe
  ]
})
export class FinancialStatusComponent implements OnInit {

  private boqsService: BOQsService = inject(BOQsService);

  @Input() workId: number = 0;

  boqs: BoqDetailed[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.boqsService.getByDetailedWorkId(this.workId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.boqs = response.data);
  }

}
