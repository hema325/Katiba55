import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.css']
})
export class CircularProgressComponent implements OnInit {

  @Input() color: string = '#198754';
  @Input() percent: number = 0;


  constructor() { }

  ngOnInit() {
  }

}
