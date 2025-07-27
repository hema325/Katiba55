import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { WorkDetailed } from 'src/app/models/works/work-detailed';
import { WorksService } from 'src/app/services/works.service';
import { CircularProgressComponent } from 'src/app/shared/circular-progress/circular-progress.component';
import { getExecutionStatusBadgeColor } from '../../../../helpers/execution-status.helper';
import { ExecutionStatusPipe } from '../../../../pipes/execution-status.pipe';
import { ToasterService } from 'src/app/services/toaster.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';

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
    BadgeComponent,
    SpinnerComponent,
    DeleteConfirmationModalComponent
  ]
})
export class BasicDetailesComponent implements OnInit {

  private worksService: WorksService = inject(WorksService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private toasterService = inject(ToasterService);
  private router: Router = inject(Router);

  projectId: number = 0;
  workId: number = 0;
  work: WorkDetailed | null = null;
  deleteConfirmationModalVisible: boolean = false;
  isDeleting: boolean = false;

  ngOnInit() {
    this.workId = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.projectId = Number(this.activatedRoute.snapshot.queryParamMap.get("projectId"));
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

  fireDeleteConfirmationModal() {
    this.isDeleting = true;
    this.deleteConfirmationModalVisible = true;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.worksService
        .delete(this.workId)
        .pipe(finalize(() => this.isDeleting = false), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف العمل بنجاح!', 'success');
            if (this.projectId) {
              this.router.navigate(['/projects', this.projectId], { fragment: 'works' });
            }
            else {
              this.router.navigate(['/']);
            }
          }
        });
    }
    else {
      this.isDeleting = false
    }
  }
}
