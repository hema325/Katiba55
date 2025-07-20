import { Component, OnInit } from '@angular/core';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, ProgressComponent, TooltipDirective } from '@coreui/angular';

@Component({
  selector: 'app-list-work-items',
  templateUrl: './list-work-items.component.html',
  styleUrls: ['./list-work-items.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    TooltipDirective,
    BadgeComponent,
    ProgressComponent
  ]
})
export class ListWorkItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
