import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ProgressComponent, RowComponent, TableDirective, TooltipDirective, WidgetStatFComponent } from '@coreui/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaginatorComponent } from '../../../../shared/paginator/paginator.component';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { CircularProgressComponent } from '../../../../shared/circular-progress/circular-progress.component';
import { ProjectExecutionComponent } from './project-execution/project-execution.component';
import { WorksComponent } from './works/works.component';
import { MediasComponent } from './medias/medias.component';

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
    ProjectExecutionComponent,
    WorksComponent,
    MediasComponent
  ]
})
export class ExecutionStatusComponent implements OnInit {

  projectTimelineData: ChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'نسبة التنفيذ',
        data: [0, 10, 35, 40, 60, 70, 80, 85, 90, 95, 98, 100],
        backgroundColor: 'rgba(51,153,255,0.85)', // أزرق واضح
        borderColor: '#39f',
        pointBackgroundColor: '#39f',
        pointBorderColor: '#fff',
        tension: 0.4,
        fill: false
      }
    ]
  }

  compareChartData: ChartData = {
    labels: ['هنجر 4', 'هنجر 3', 'هنجر 2', 'هنجر 1'],
    datasets: [
      {
        label: 'نسبة التنفيذ',
        data: [25, 50, 80, 100],
        backgroundColor: 'rgba(0,204,102,0.85)', // أخضر واضح
        borderColor: '#0c6',
        pointBackgroundColor: '#0c6',
        pointBorderColor: '#fff',
        tension: 0.4,
        fill: false
      }
    ]
  };

  worksTimelineData: ChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'هنجر 1',
        data: [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        backgroundColor: 'rgba(51,153,255,0.85)', // أزرق واضح
        borderColor: '#39f',
        pointBackgroundColor: '#39f',
        pointBorderColor: '#fff',
      },
      {
        label: 'هنجر 2',
        data: [0, 3, 8, 15, 25, 35, 45, 55, 65, 75, 85, 95],
        backgroundColor: 'rgba(255,152,0,0.85)', // برتقالي واضح
        borderColor: '#f90',
        pointBackgroundColor: '#f90',
        pointBorderColor: '#fff',
        tension: 0.4,
        fill: false
      },
      {
        label: 'هنجر 3',
        data: [0, 2, 6, 12, 18, 28, 38, 48, 58, 68, 78, 88],
        backgroundColor: 'rgba(0,204,102,0.85)', // أخضر واضح
        borderColor: '#0c6',
        pointBackgroundColor: '#0c6',
        pointBorderColor: '#fff',
        tension: 0.4,
        fill: false
      },
      {
        label: 'هنجر 4',
        data: [0, 4, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
        backgroundColor: 'rgba(232,62,140,0.85)', // وردي واضح
        borderColor: '#e83e8c',
        pointBackgroundColor: '#e83e8c',
        pointBorderColor: '#fff',
        tension: 0.4,
        fill: false
      }
    ]
  };

  worksTimelineChartType: 'line' | 'bar' = 'line';
  projectTimelineChartType: 'line' | 'bar' = 'line';
  compareChartType: 'line' | 'bar' = 'bar';

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  projectId: number = 0;
  constructor() { }

  ngOnInit() {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  setWorksTimelineChartType(type: 'bar' | 'line') {
    this.worksTimelineChartType = type;
  }

  setProjectTimelineChartType(type: 'line' | 'bar') {
    this.projectTimelineChartType = type;
  }

  setCompareChartType(type: 'line' | 'bar') {
    this.compareChartType = type;
  }

}
