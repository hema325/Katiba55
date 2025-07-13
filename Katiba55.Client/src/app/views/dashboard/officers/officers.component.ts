import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent, CardBodyComponent, CardComponent, TooltipDirective } from '@coreui/angular';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css'],
  imports: [
    RouterLink,
    BadgeComponent,
    TooltipDirective,
    CardComponent,
    CardBodyComponent,
  ]
})
export class OfficersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
