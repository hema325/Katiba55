import { Component, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ProgressComponent, RowComponent, TableDirective } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
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
    RouterLink
  ]
})
export class ProjectEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
