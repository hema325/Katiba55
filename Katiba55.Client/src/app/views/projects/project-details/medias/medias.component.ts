import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, TooltipDirective } from '@coreui/angular';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    TooltipDirective,
    DatePipe
  ]
})
export class MediasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
