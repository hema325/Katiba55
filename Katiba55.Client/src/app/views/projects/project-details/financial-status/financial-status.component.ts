import { Component, inject, Input, OnInit } from '@angular/core';
import { WorksService } from '../../../../services/works.service';
import { WorkWithDetailedBoq } from '../../../../models/works/work-with-detailed-boq';
import { finalize, first } from 'rxjs';
import { DecimalPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.css'],
  imports: [
    DecimalPipe,
    JsonPipe
  ]
})
export class FinancialStatusComponent implements OnInit {

  private worksService: WorksService = inject(WorksService);
  @Input() projectId: number = 0;

  works: WorkWithDetailedBoq[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.worksService.getDetailedWithBOQByProjectId(this.projectId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.works = response.data);
  }

  getWorkRowSpan(work: any): number {
    let count = 0;
    for (const boq of work.boQs) {
      count += (boq.contract?.invoices?.length || 1);
    }
    return count;
  }
}
