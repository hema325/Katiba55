import { Component, OnInit } from '@angular/core';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, ProgressComponent, TooltipDirective } from '@coreui/angular';

@Component({
  selector: 'app-edit-works',
  templateUrl: './edit-works.component.html',
  styleUrls: ['./edit-works.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TooltipDirective,
    BadgeComponent,
    ProgressComponent
  ]
})
export class EditWorksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
