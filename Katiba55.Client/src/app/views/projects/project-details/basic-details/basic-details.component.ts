import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ProgressComponent, RowComponent, TableDirective, WidgetStatFComponent } from '@coreui/angular';
import { CircularProgressComponent } from '../../../../shared/circular-progress/circular-progress.component';
import { PaginatorComponent } from '../../../../shared/paginator/paginator.component';
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    ButtonDirective,
    RouterLink,
    CircularProgressComponent
  ]
})
export class BasicDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
