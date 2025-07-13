import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent, CardBodyComponent, CardComponent, TooltipDirective } from '@coreui/angular';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  imports: [
    RouterLink,
    BadgeComponent,
    TooltipDirective,
    CardComponent,
    CardBodyComponent,
  ]
})
export class CompaniesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
