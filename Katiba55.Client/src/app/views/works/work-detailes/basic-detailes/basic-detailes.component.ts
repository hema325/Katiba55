import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { first } from 'rxjs';
import { WorkDetailed } from 'src/app/models/works/work-detailed';
import { WorksService } from 'src/app/services/works.service';
import { CircularProgressComponent } from 'src/app/shared/circular-progress/circular-progress.component';
import { getExecutionStatusBadgeColor } from '../../../../helpers/execution-status.helper';
import { ExecutionStatusPipe } from '../../../../pipes/execution-status.pipe';

@Component({
  selector: 'app-basic-detailes',
  templateUrl: './basic-detailes.component.html',
  styleUrls: ['./basic-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CircularProgressComponent,
    DatePipe,
    ExecutionStatusPipe,
    RouterLink,
    DecimalPipe,
    BadgeComponent
  ]
})
export class BasicDetailesComponent implements OnInit {

  private worksService: WorksService = inject(WorksService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  workId: number = 0;
  work: WorkDetailed | null = null;

  ngOnInit() {
    this.workId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.loadWork();
  }

  loadWork() {
    this.worksService.getDetailedById(this.workId)
      .pipe(first())
      .subscribe(response => this.work = response.data);
  }

  getExecutionStatusBadgeColor(status: string): string {
    return getExecutionStatusBadgeColor(status);
  }
}
