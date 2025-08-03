import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ProgressComponent, RowComponent, TableDirective, TooltipDirective, WidgetStatFComponent } from '@coreui/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaginatorComponent } from '../../../../shared/paginator/paginator.component';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { CircularProgressComponent } from '../../../../shared/circular-progress/circular-progress.component';
import { ProjectsService } from '../../../../services/projects.service';
import { WorksService } from '../../../../services/works.service';
import { MediasService } from '../../../../services/medias.service';
import { ProjectDetailed } from '../../../../models/projects/project-detailed';
import { WorkDetailedWithItems } from '../../../../models/works/work-detailed-with-items';
import { Media } from '../../../../models/medias/media';
import { finalize, first } from 'rxjs';
import { MediaReferenceTypes } from '../../../../enums/media-reference-types.enum';
import { Environment } from '../../../../static-data/environment';
import { getExecutionStatusBadgeColor } from '../../../../helpers/execution-status.helper';
import { ExecutionStatusPipe } from '../../../../pipes/execution-status.pipe';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
import { WorkDetailed } from '../../../../models/works/work-detailed';
import { getRandomChartColorObject } from '../../../../helpers/chart-color.helper';
import { getArabicMonthName } from '../../../../helpers/date.helper';
import { WorkExecutionSummary } from 'src/app/models/works/work-execution-summary';
import { ItemBrief } from 'src/app/models/items/item-brief';

@Component({
  selector: 'app-execution-status',
  templateUrl: './execution-status.component.html',
  styleUrls: ['./execution-status.component.css'],
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
    CircularProgressComponent,
    TooltipDirective,
    ExecutionStatusPipe,
    DatePipe,
    DecimalPipe,
    ExecutionStatusPipe,
    SlicePipe
  ]
})
export class ExecutionStatusComponent implements OnInit {
  baseUrl = Environment.apiUrl;

  private projectsService: ProjectsService = inject(ProjectsService);
  private worksService: WorksService = inject(WorksService);
  private mediasService: MediasService = inject(MediasService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  project: ProjectDetailed | null = null;
  works: WorkDetailed[] = [];
  medias: Media[] = [];
  worksExecutionSummary: WorkExecutionSummary | null = null;

  worksExecutionChartData: any | null = null;
  projectTimelineData: any | null = null;
  worksTimelineData: any | null = null;

  projectTimelineChartType: 'line' | 'bar' = 'line';
  worksTimelineChartType: 'line' | 'bar' = 'line';


  projectId: number = 0;
  isLoadingProject = false;
  isLoadingWorks = false;
  isLoadingMedias = false;

  ngOnInit() {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadProject();
    this.loadWorks();
    this.loadMedias();
    this.loadProjectTimeLineProgressData();
    this.loadWorksTimeLineProgressData();
    // this.loadWorksExecutionSummary();
  }

  loadProject() {
    this.isLoadingProject = true;
    this.projectsService.getDetailedById(this.projectId)
      .pipe(finalize(() => this.isLoadingProject = false), first())
      .subscribe(response => this.project = response.data);
  }

  loadWorks() {
    this.isLoadingWorks = true;
    this.worksService.getDetailedByProjectId(this.projectId)
      .pipe(finalize(() => this.isLoadingWorks = false), first())
      .subscribe(response => {
        if (response.success) {
          this.works = response.data

          if (this.works.length > 0) {
            this.worksExecutionChartData = {
              labels: this.works.map(w => w.name),
              datasets: [{
                label: 'نسبة التنفيذ',
                data: this.works.map(w => w.executionPercent),
                ...getRandomChartColorObject()
              }]
            };
          }
        }
      });
  }

  loadMedias() {
    this.isLoadingMedias = true;
    this.mediasService.getByReference(this.projectId, MediaReferenceTypes.Project, true)
      .pipe(finalize(() => this.isLoadingMedias = false), first())
      .subscribe(response => this.medias = response.data);
  }

  loadProjectTimeLineProgressData() {
    this.projectsService.getMonthlyTimelineProgressById(this.projectId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const items = response.data;
          let useMonthNames = items[0].year == items[items.length - 1].year;
          this.projectTimelineData = {
            labels: items.map(item => useMonthNames ? getArabicMonthName(item.month) : `${item.year}-${item.month}`),
            datasets: [{
              label: 'نسبة التنفيذ',
              data: [...items.map(item => item.percentage || 0), 100],
              tension: 0.4,
              ...getRandomChartColorObject()
            }]
          };
        }
      });
  }

  loadWorksTimeLineProgressData() {
    this.worksService.getMonthlyTimelineProgressByProjectId(this.projectId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const works = response.data;
          let useMonthNames = works[0].items[0].year == works[0].items[works[0].items.length - 1].year;
          if (works && works.length > 0) {
            this.worksTimelineData = {
              labels: works[0].items.map(item => useMonthNames ? getArabicMonthName(item.month) : `${item.year}-${item.month}`),
              datasets: works.map(work => ({
                label: work.workName,
                data: [...work.items.map(item => item.percentage || 0), 100],
                tension: 0.4,
                ...getRandomChartColorObject()
              }))
            };
          }
        }
      });
  }

  loadWorksExecutionSummary() {
    this.worksService.getWorksExecutionSummaryByProjectId(this.projectId)
      .pipe(first())
      .subscribe(response => this.worksExecutionSummary = response.data);
  }


  setWorksTimelineChartType(type: 'bar' | 'line') {
    this.worksTimelineChartType = type;
  }

  setProjectTimelineChartType(type: 'line' | 'bar') {
    this.projectTimelineChartType = type;
  }

  getExecutionStatusBadgeColor(status: any): string {
    return getExecutionStatusBadgeColor(status);
  }

  getItemPercentageByName(name: string, items: ItemBrief[]) {
    var item = items.find(i => i.name == name);
    if (item) {
      return item.executionPercent ? item.executionPercent + "%" : "0%";
    }

    return 0;
  }

}
