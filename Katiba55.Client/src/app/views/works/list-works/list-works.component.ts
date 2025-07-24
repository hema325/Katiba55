import { Component, inject, Input, OnInit } from '@angular/core';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, ProgressComponent, SpinnerComponent, TooltipDirective } from '@coreui/angular';
import { ToasterService } from '../../../services/toaster.service';
import { WorkBrief } from '../../../models/works/work-brief';
import { WorksService } from '../../../services/works.service';
import { finalize, first } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ExecutionStatusPipe } from '../../../pipes/execution-status.pipe';
import { RouterLink } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { getExecutionProgressColor, getExecutionStatusBadgeColor } from '../../../helpers/execution-status.helper';

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
    ProgressComponent,
    DatePipe,
    ExecutionStatusPipe,
    RouterLink,
    DeleteConfirmationModalComponent,
    SpinnerComponent
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
    this.worksService.getBriefByProjectId(this.projectId)
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

  getExecutionStatusBadgeColor(status: any): string {
    return getExecutionStatusBadgeColor(status);
  }

  getExecutionProgressColor(percent: number): string {
    return getExecutionProgressColor(percent);
  }
}
