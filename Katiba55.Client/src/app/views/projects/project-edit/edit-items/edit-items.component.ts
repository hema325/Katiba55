import { Component, OnInit } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, TooltipDirective } from '@coreui/angular';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TooltipDirective,
  ]
})
export class EditItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
