import { Component, inject, Input, OnInit } from '@angular/core';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, ProgressComponent, SpinnerComponent, TooltipDirective } from '@coreui/angular';
import { ToasterService } from '../../../services/toaster.service';
import { WorkCompaniesService } from '../../../services/work-companies.service';
import { finalize, first } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ExecutionStatusPipe } from '../../../pipes/execution-status.pipe';
import { RouterLink } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { getExecutionProgressColor, getExecutionStatusBadgeColor } from '../../../helpers/execution-status.helper';
import { WorkCompanyDetailed } from '../../../models/work-companies/work.company-detailed';

@Component({
  selector: 'app-list-work-companies',
  templateUrl: './list-work-companies.component.html',
  styleUrls: ['./list-work-companies.component.css'],
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
  ],
  standalone: true
})
export class ListWorkCompaniesComponent implements OnInit {

  private workCompaniesService: WorkCompaniesService = inject(WorkCompaniesService);
  private toasterService: ToasterService = inject(ToasterService);

  @Input() workId: number = 0;

  workCompanies: WorkCompanyDetailed[] = [];
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: WorkCompanyDetailed | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.workCompaniesService.getByWorkId(this.workId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.workCompanies = response.data);
  }

  fireDeleteConfirmationModal(company: WorkCompanyDetailed) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = company;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.workCompaniesService.delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف الشركة بنجاح!', 'success');
            this.workCompanies = this.workCompanies.filter(c => c.id !== this.deletedItem!.id);
          }
        });
    } else {
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