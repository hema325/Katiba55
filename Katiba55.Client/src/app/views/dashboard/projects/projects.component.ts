import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent, CardBodyComponent, CardComponent, ProgressComponent, TooltipDirective } from '@coreui/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  imports: [
    RouterLink,
    BadgeComponent,
    TooltipDirective,
    CardComponent,
    CardBodyComponent,
    ProgressComponent
  ]
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
