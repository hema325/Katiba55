import { Component, OnInit } from '@angular/core';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, ProgressComponent, TooltipDirective } from '@coreui/angular';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TooltipDirective,
    BadgeComponent,
    ProgressComponent
  ]
})
export class WorksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
