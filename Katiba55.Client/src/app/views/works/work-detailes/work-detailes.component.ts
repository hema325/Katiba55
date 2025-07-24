import { Component, inject, OnInit } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { BasicDetailesComponent } from './basic-detailes/basic-detailes.component';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ListItemsComponent } from '../../items/list-items/list-items.component';
@Component({
  selector: 'app-work-detailes',
  templateUrl: './work-detailes.component.html',
  styleUrls: ['./work-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    BasicDetailesComponent,
    ListItemsComponent
  ]
})
export class WorkDetailesComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  workId: number = 0;
  activeTab: 'basic-details' | 'items' | 'medias' = 'basic-details';

  setActiveTab(tab: 'basic-details' | 'items' | 'medias') {
    this.activeTab = tab;
  }

  initActiveTab() {
    const fragment = this.activatedRoute.snapshot.fragment;
    switch (fragment) {
      case 'basic-details':
      case 'items':
        this.activeTab = fragment;
        break;
      default:
        this.activeTab = 'basic-details';
    }
  }

  ngOnInit() {
    this.workId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initActiveTab();
  }

}
