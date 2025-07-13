import { Component, Input, OnInit } from '@angular/core';
import { SpinnerComponent } from '@coreui/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  imports: [
    SpinnerComponent
  ]
})
export class LoaderComponent implements OnInit {

  @Input() height: string = '100px';

  constructor() { }

  ngOnInit() {
  }

}
