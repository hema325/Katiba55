import { Component, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ProgressComponent, RowComponent, TabDirective, TableDirective, TabPanelComponent, TabsComponent, TabsContentComponent, TabsListComponent } from '@coreui/angular';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ChartData } from 'chart.js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.css'],
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
    TabDirective,
    TabPanelComponent,
    TabsComponent,
    TabsContentComponent,
    TabsListComponent,
    RouterLink
  ]
})
export class WorkDetailsComponent implements OnInit {

  currentPage: any = 1;
  options = {
    maintainAspectRatio: false
  };
  timelineProgressData: ChartData = {
    labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'],
    datasets: [
      {
        label: 'نسب التنفيذ',
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

  constructor() { }

  ngOnInit() {
  }

}
