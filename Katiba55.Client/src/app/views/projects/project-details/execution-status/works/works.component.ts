import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, ProgressBarComponent, ProgressComponent, TooltipDirective } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { ExecutionStatus } from 'src/app/enums/execution-status.enum';
import { WorkDetailed } from 'src/app/models/works/work-detailed';
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

  works: WorkDetailed[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.worksService.getDetailedByProjectId(this.projectId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.works = response.data);
  }

  getStatusBadgeColor(status: string): string {
    switch (status) {
      case ExecutionStatus.Pending:
        return 'secondary';
      case ExecutionStatus.OnHold:
        return 'danger';
      case ExecutionStatus.Underconstruction:
        return 'warning';
      case ExecutionStatus.Completed:
        return 'success';
      case ExecutionStatus.Cancelled:
        return 'danger';
      default:
        return 'info';
    }
  }

  getExecutionProgressColor(percent: number): string {
    if (percent >= 85) return 'success';
    if (percent >= 50) return 'info';
    if (percent >= 25) return 'warning';
    if (percent > 0) return 'danger';
    return 'secondary';
  }
}
