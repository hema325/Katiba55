import { Component, inject, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ProgressComponent, RowComponent, TableDirective, WidgetStatFComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { RouterLink } from '@angular/router';
import { ChartData } from 'chart.js';
import { ProjectsService } from '../../../services/projects.service';
import { ProjectsReport } from '../../../models/projects/projects-report';
import { ProjectBrief } from '../../../models/projects/project-brief';
import { finalize, first } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { getRandomChartColorObject } from '../../../helpers/chart-color.helper';
import { getArabicMonthName } from '../../../helpers/date.helper';

@Component({
  selector: 'app-projects-report',
  templateUrl: './projects-report.component.html',
  styleUrls: ['./projects-report.component.css'],
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ButtonDirective,
    BadgeComponent,
    ChartjsComponent,
    TableDirective,
    ProgressComponent,
    CardFooterComponent,
    PaginatorComponent,
    RouterLink,
    WidgetStatFComponent,
    DecimalPipe
  ]
})
export class ProjectsReportComponent implements OnInit {

  private projectsService = inject(ProjectsService);

  projectReport: ProjectsReport | null = null;
  projects: ProjectBrief[] = [];
  isLoadingReport: boolean = false;
  isLoadingProjects: boolean = false;

  projectsExecutionChartData: any = null;
  projectsTimelineData: any = null;
  projectsTimelineChartType: 'bar' | 'line' = 'line';

  ngOnInit() {
    this.loadReport();
    this.loadProjects();
    this.loadProjectsTimeLineProgressData();
  }

  loadReport() {
    this.isLoadingReport = true;
    this.projectsService.report()
      .pipe(finalize(() => this.isLoadingReport = false))
      .subscribe(response => this.projectReport = response.data);
  }

  loadProjects() {
    this.isLoadingProjects = true;
    this.projectsService.getAll()
      .pipe(finalize(() => this.isLoadingProjects = false))
      .subscribe(response => {
        if (response.success) {
          this.projects = response.data;

          if (this.projects && this.projects.length > 0) {
            this.projectsExecutionChartData = {
              labels: this.projects.map(p => p.name),
              datasets: [{
                label: 'نسبة التنفيذ',
                data: this.projects.map(p => p.executionPercent || 0),
                ...getRandomChartColorObject()
              }]
            }
          }
        }
      });
  }

  loadProjectsTimeLineProgressData() {
    this.projectsService.getMonthlyTimelineProgress()
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const projects = response.data;
          let useMonthNames = projects[0].items[0].year == projects[0].items[projects[0].items.length - 1].year;
          if (projects && projects.length > 0) {
            this.projectsTimelineData = {
              labels: projects[0].items.map(item => useMonthNames ? getArabicMonthName(item.month) : `${item.year}-${item.month}`),
              datasets: projects.map(project => ({
                label: project.projectName,
                data: [...project.items.map(item => item.percentage || 0), 100],
                tension: 0.4,
                ...getRandomChartColorObject()
              }))
            };
          }
        }
      });
  }

  setProjectsTimelineChartType(type: 'bar' | 'line') {
    this.projectsTimelineChartType = type;
  }

}
