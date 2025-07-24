import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, ProgressBarComponent, ProgressComponent, TooltipDirective } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { ExecutionStatus } from 'src/app/enums/execution-status.enum';
import { getExecutionProgressColor, getExecutionStatusBadgeColor } from 'src/app/helpers/execution-status.helper';
import { WorkDetailed } from 'src/app/models/works/work-detailed';
import { WorkDetailedWithItems } from 'src/app/models/works/work-detailed-with-items';
import { ExecutionStatusPipe } from 'src/app/pipes/execution-status.pipe';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    BadgeComponent,
    RouterLink,
    TooltipDirective,
    ProgressComponent,
    ExecutionStatusPipe,
    DatePipe
  ]
})
export class WorksComponent implements OnInit {

  private worksService: WorksService = inject(WorksService);

  @Input() projectId: number = 0;

  works: WorkDetailedWithItems[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.worksService.getDetailedByProjectId(this.projectId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.works = response.data);
  }

  getExecutionStatusBadgeColor(status: string): string {
    return getExecutionStatusBadgeColor(status as ExecutionStatus);
  }

  getExecutionProgressColor(percent: number): string {
    return getExecutionProgressColor(percent);
  }
}
