import { Component } from '@angular/core';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, BadgeComponent, TableDirective, ProgressComponent, CardFooterComponent, PaginationComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ChartData, ChartOptions } from 'chart.js';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
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
    PaginatorComponent
  ]
})
export class ProjectDetailsComponent {

  currentPage: any = 1;

  options = {
    maintainAspectRatio: false
  };

  chartBarData: ChartData = {
    labels: ['القيمة التقديرية', 'المخصص المالى'],
    datasets: [
      {
        label: 'الميزانية',
        backgroundColor: '#f87979',
        data: [100000, 80000]
      }
    ]
  };

  timelineProgressData: ChartData = {
    labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'],
    datasets: [
      {
        label: 'نسبة الإنجاز',
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
}
