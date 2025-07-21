import { Component, inject, Input, OnInit } from '@angular/core';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, ProgressComponent, SpinnerComponent, TooltipDirective } from '@coreui/angular';
import { WorksService } from '../../../services/works.service';
import { ToasterService } from '../../../services/toaster.service';
import { WorkItemsService } from '../../../services/work-items.service';
import { WorkItemDetailed } from '../../../models/work-items/work-item-detailed';
import { finalize, first } from 'rxjs';
import { ExecutionStatus } from '../../../enums/execution-status.enum';
import { ExecutionStatusPipe } from '../../../pipes/execution-status.pipe';
import { DatePipe } from '@angular/common';
import { DeleteConfirmationModalComponent } from '../../../shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-work-items',
  templateUrl: './list-work-items.component.html',
  styleUrls: ['./list-work-items.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    TooltipDirective,
    BadgeComponent,
    ProgressComponent,
    ExecutionStatusPipe,
    DatePipe,
    SpinnerComponent,
    DeleteConfirmationModalComponent,
    RouterLink
  ]
})
export class ListWorkItemsComponent implements OnInit {

  private workItemsService: WorkItemsService = inject(WorkItemsService);
  private toasterService: ToasterService = inject(ToasterService);

  @Input() workId: number = 0;

  workItems: WorkItemDetailed[] = [];
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: WorkItemDetailed | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    this.loadWorkItems();
  }



  loadWorkItems() {
    this.isLoading = true;
    this.workItemsService.getByWorkId(this.workId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.workItems = response.data);
  }

  fireDeleteConfirmationModal(workItem: WorkItemDetailed) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = workItem;
  }


  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.workItemsService.delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف العمل بنجاح!', 'success');
            this.workItems = this.workItems.filter(p => p.id !== this.deletedItem!.id);
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
