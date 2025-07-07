import { Component, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ProgressComponent, RowComponent, TableDirective, WidgetStatFComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { RouterLink } from '@angular/router';
import { ChartData } from 'chart.js';

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
    WidgetStatFComponent
  ]
})
export class ProjectsReportComponent implements OnInit {

  months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  options = {
    maintainAspectRatio: false
  };

  chartBarData: ChartData = {
    labels: ['حسب اللة الكفراوى', 'ممشى اهل مصر', 'الدلتا الجديدة', 'الطريق الساحلى'].slice(0, 7),
    datasets: [
      {
        label: 'نسبة التنفيذ',
        backgroundColor: '#f87979',
        data: [100, 80, 50, 25]
      }
    ]
  };

  chartLineData: ChartData = {
    labels: [...this.months].slice(0, 7),
    datasets: [
      {
        label: 'ممشى اهل مصر',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(220, 220, 220, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: '#fff',
        data: [0, 10, 40, 50, 60, 100, 100]
      },
      {
        label: 'الطريق الساحلى',
        backgroundColor: 'rgba(151, 187, 205, 0.2)',
        borderColor: 'rgba(151, 187, 205, 1)',
        pointBackgroundColor: 'rgba(151, 187, 205, 1)',
        pointBorderColor: '#fff',
        data: [0, 25, 30, 30, 50, 80, 100]
      },
      {
        label: 'الدلتا الجديدة',
        backgroundColor: 'rgba(248, 121, 121, 0.2)',
        borderColor: 'rgba(248, 121, 121, 1)',
        pointBackgroundColor: 'rgba(248, 121, 121, 1)',
        pointBorderColor: '#fff',
        data: [0, 50, 80, 90, 100, 100, 100]
      }
    ]
  };

  chartPieData: ChartData = {
    labels: ['مكتمل', 'تحت الانشاء', 'متوقف'],
    datasets: [
      {
        data: [100, 50, 20],
        backgroundColor: ['#41B883', '#FFCE56', '#E46651'],
        hoverBackgroundColor: ['#41B883', '#FFCE56', '#E46651']
      }
    ]
  };

  chartDoughnutData: ChartData = {
    labels: ['ضباط على قوة الكتيبة', 'ضباط ليست على قوت الكتيبة'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651'],
        data: [100, 20]
      }
    ]
  };


  constructor() { }

  ngOnInit() {
  }

}
