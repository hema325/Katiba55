import { Component, OnInit } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { BasicDetailesComponent } from './basic-detailes/basic-detailes.component';
import { ListWorkItemsComponent } from '../../work-items/list-work-items/list-work-items.component';

@Component({
  selector: 'app-work-detailes',
  templateUrl: './work-detailes.component.html',
  styleUrls: ['./work-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    BasicDetailesComponent,
    ListWorkItemsComponent
  ]
})
export class WorkDetailesComponent implements OnInit {

  activeTab: 'basic-details' | 'items' = 'basic-details';

  setActiveTab(tab: 'basic-details' | 'items') {
    this.activeTab = tab;
  }

  ngOnInit() {
  }

}
