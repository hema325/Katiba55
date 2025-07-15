import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ProgressComponent, RowComponent, TableDirective, WidgetStatFComponent } from '@coreui/angular';
import { CircularProgressComponent } from '../../../../shared/circular-progress/circular-progress.component';
import { PaginatorComponent } from '../../../../shared/paginator/paginator.component';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ProjectsService } from '../../../../services/projects.service';
import { ProjectDetailed } from '../../../../models/projects/project-detailed';
import { finalize, first } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    DatePipe
  ]
})
export class BasicDetailsComponent implements OnInit {

  private projectsService: ProjectsService = inject(ProjectsService);
  private activatedRoute = inject(ActivatedRoute);
  private santitizer: DomSanitizer = inject(DomSanitizer);
  sanitizedMapUrl: SafeResourceUrl | null = null;
  project: ProjectDetailed | null = null;
  projectId: number = 0;
  isLoading: boolean = false;

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
}
