import { Component } from '@angular/core';
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, BadgeComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ChartData, ChartOptions } from 'chart.js';

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
    ChartjsComponent
  ]
})
export class ProjectDetailsComponent {

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

}
