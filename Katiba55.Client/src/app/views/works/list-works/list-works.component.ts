import { Component, inject, Input, OnInit } from '@angular/core';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, ProgressComponent, TooltipDirective } from '@coreui/angular';
import { ToasterService } from '../../../services/toaster.service';
import { WorkBrief } from '../../../models/works/work-brief';
import { WorksService } from '../../../services/works.service';
import { finalize, first } from 'rxjs';
import { ExecutionStatus } from '../../../enums/execution-status.enum';

@Component({
  selector: 'app-list-works',
  templateUrl: './list-works.component.html',
  styleUrls: ['./list-works.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TooltipDirective,
    BadgeComponent,
    ProgressComponent
  ]
})
export class ListWorksComponent implements OnInit {

  private worksService: WorksService = inject(WorksService)
  private toasterService: ToasterService = inject(ToasterService);

  @Input() projectId: number = 0;

  works: WorkBrief[] = [];
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: WorkBrief | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.worksService.getByProjectId(this.projectId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.works = response.data);
  }

  fireDeleteConfirmationModal(work: WorkBrief) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = work;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.worksService.delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف العمل بنجاح!', 'success');
            this.works = this.works.filter(p => p.id !== this.deletedItem!.id);
          }
        });
    }
    else {
      this.deletedItem = null;
    }
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
}
