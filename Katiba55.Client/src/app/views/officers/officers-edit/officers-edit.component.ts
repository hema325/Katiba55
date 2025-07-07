import { Component, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';

@Component({
  selector: 'app-officers-edit',
  templateUrl: './officers-edit.component.html',
  styleUrls: ['./officers-edit.component.css'],
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
export class OfficersEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
