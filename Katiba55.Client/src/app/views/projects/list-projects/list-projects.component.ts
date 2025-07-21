import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BadgeComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, ProgressComponent, SpinnerComponent, TooltipDirective } from '@coreui/angular';
import { ToasterService } from '../../../services/toaster.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { ProjectBrief } from '../../../models/projects/project-brief';
import { finalize, first } from 'rxjs';
import { ExecutionStatusPipe } from '../../../pipes/execution-status.pipe';
import { ExecutionStatus } from '../../../enums/execution-status.enum';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    ButtonDirective,
    DatePipe,
    BadgeComponent,
    ProgressComponent,
    SpinnerComponent,
    DeleteConfirmationModalComponent,
    RouterLink,
    DatePipe,
    ExecutionStatusPipe,
    TooltipDirective
  ]
})
export class ListProjectsComponent implements OnInit {
  private projectsService: ProjectsService = inject(ProjectsService)
  private toasterService = inject(ToasterService);

  projects: ProjectBrief[] = [];
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: ProjectBrief | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading = true;
    this.projectsService.getAll()
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.projects = response.data);
  }

  fireDeleteConfirmationModal(project: ProjectBrief) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = project;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.projectsService.delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف المشروع بنجاح!', 'success');
            this.projects = this.projects.filter(p => p.id !== this.deletedItem!.id);
          }
        })
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

  getExecutionProgressColor(percent: number): string {
    if (percent >= 85) return 'success';
    if (percent >= 50) return 'info';
    if (percent >= 25) return 'warning';
    if (percent > 0) return 'danger';
    return 'secondary';
  }


}
