import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, TooltipDirective } from '@coreui/angular';
import { Tooltip } from 'chart.js';

@Component({
  selector: 'app-edit-medias',
  templateUrl: './edit-medias.component.html',
  styleUrls: ['./edit-medias.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    TooltipDirective,
    DatePipe
  ]
})
export class EditMediasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
