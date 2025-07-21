import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { ExecutionStatus } from 'src/app/enums/execution-status.enum';
import { ProjectBrief } from 'src/app/models/projects/project-brief';
import { ProjectsService } from 'src/app/services/projects.service';
import { CircularProgressComponent } from 'src/app/shared/circular-progress/circular-progress.component';

@Component({
  selector: 'app-project-execution',
  templateUrl: './project-execution.component.html',
  styleUrls: ['./project-execution.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CircularProgressComponent,
    DatePipe
  ]
})
export class ProjectExecutionComponent implements OnInit {

  private projectsService: ProjectsService = inject(ProjectsService);

  @Input() projectId: number = 0;

  project: ProjectBrief | null = null;
  isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    this.projectsService.getBriefById(this.projectId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.project = response.data);
  }
}
