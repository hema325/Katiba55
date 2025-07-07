import { Component, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';

@Component({
  selector: 'app-officer-details',
  templateUrl: './officer-details.component.html',
  styleUrls: ['./officer-details.component.css'],
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    BadgeComponent,
    ButtonDirective,
  ]
})
export class OfficerDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
