import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ProgressComponent, RowComponent, TableDirective, WidgetStatFComponent } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { PaginatorComponent } from '../../../../shared/paginator/paginator.component';
import { ChartjsComponent } from '@coreui/angular-chartjs';

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
    WidgetStatFComponent
  ]
})
export class ExecutionStatusComponent implements OnInit {
  options = {
    maintainAspectRatio: false
  };

  timelineProgressData: ChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    ,
    datasets: [
      {
        label: 'نسبة التنفيذ',
        data: [0, 10, 35, 40, 60, 70, 80, 85, 90, 95, 98, 100],
        borderColor: '#39f',
        backgroundColor: 'rgba(51,153,255,0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#39f',
        pointBorderColor: '#fff',
        pointRadius: 5
      }
    ]
  }

  chartBarData: ChartData = {
    labels: ['هنجر 4', 'هنجر 3', 'هنجر 2', 'هنجر 1'].reverse().slice(0, 7),
    datasets: [
      {
        label: 'نسبة التنفيذ',
        backgroundColor: '#f87979',
        data: [100, 80, 50, 25]
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
