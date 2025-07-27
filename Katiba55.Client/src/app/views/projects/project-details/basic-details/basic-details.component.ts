import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, SpinnerComponent } from '@coreui/angular';
import { CircularProgressComponent } from '../../../../shared/circular-progress/circular-progress.component';
import { ProjectsService } from '../../../../services/projects.service';
import { ProjectDetailed } from '../../../../models/projects/project-detailed';
import { finalize, first } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToasterService } from 'src/app/services/toaster.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { ExecutionStatusPipe } from 'src/app/pipes/execution-status.pipe';
import { getExecutionStatusBadgeColor } from 'src/app/helpers/execution-status.helper';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    ButtonDirective,
    RouterLink,
    CircularProgressComponent,
    DatePipe,
    DecimalPipe,
    SpinnerComponent,
    DeleteConfirmationModalComponent,
    BadgeComponent,
    ExecutionStatusPipe,
    BadgeComponent
  ]
})
export class BasicDetailsComponent implements OnInit {

  private projectsService: ProjectsService = inject(ProjectsService);
  private activatedRoute = inject(ActivatedRoute);
  private santitizer: DomSanitizer = inject(DomSanitizer);
  private toasterService = inject(ToasterService);
  private router: Router = inject(Router);
  sanitizedMapUrl: SafeResourceUrl | null = null;
  project: ProjectDetailed | null = null;
  projectId: number = 0;
  isLoading: boolean = false;
  deleteConfirmationModalVisible: boolean = false;
  isDeleting: boolean = false;

  getSanitizedMapUrl(latitude: any, longitude: any): SafeResourceUrl | null {
    if (latitude && longitude) {
      const mapUrl = `https://maps.google.com?q=${latitude},${longitude}&hl=ar&z=14&output=embed`;
      return this.santitizer.bypassSecurityTrustResourceUrl(mapUrl);
    }

    return null;
  }

  ngOnInit() {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadProject();
  }

  loadProject() {
    this.isLoading = true;
    this.projectsService.getDetailedById(this.projectId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => {
        this.project = response.data;
        this.sanitizedMapUrl = this.getSanitizedMapUrl(this.project.latitude, this.project.longitude);
      });
  }

  fireDeleteConfirmationModal() {
    this.isDeleting = true;
    this.deleteConfirmationModalVisible = true;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.projectsService
        .delete(this.projectId)
        .pipe(finalize(() => this.isDeleting = false), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف المشروع بنجاح!', 'success');
            this.router.navigate(['/projects']);
          }
        });
    }
    else {
      this.isDeleting = false
    }
  }

  getExecutionStatusBadgeColor(status: any) {
    return getExecutionStatusBadgeColor(status);
  }
}
