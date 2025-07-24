import { Component, OnInit } from '@angular/core';
import { BasicDetailesComponent } from './basic-detailes/basic-detailes.component';
import { CardBodyComponent, CardComponent } from '@coreui/angular';

@Component({
  selector: 'app-item-detailes',
  templateUrl: './item-detailes.component.html',
  styleUrls: ['./item-detailes.component.css'],
  imports: [
    BasicDetailesComponent,
    CardComponent,
    CardBodyComponent
  ]
})
export class ItemDetailesComponent implements OnInit {


  activeTab: 'basic-details' | 'medias' = 'basic-details';

  ngOnInit() {
  }

  setActiveTab(tab: 'basic-details' | 'medias') {
    this.activeTab = tab;
  }

}
