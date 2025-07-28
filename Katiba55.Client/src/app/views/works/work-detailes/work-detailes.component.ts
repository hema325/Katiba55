import { Component, inject, OnInit } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { BasicDetailesComponent } from './basic-detailes/basic-detailes.component';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ListItemsComponent } from '../../items/list-items/list-items.component';
import { ListMediasComponent } from '../../medias/list-medias/list-medias.component';
import { MediaReferenceTypes } from 'src/app/enums/media-reference-types.enum';
import { ExecutionStatusComponent } from './execution-status/execution-status.component';
import { ListBoqsComponent } from '../../boqs/list-boqs/list-boqs.component';
import { FinancialStatusComponent } from './financial-status/financial-status.component';
import { ListWorkCompaniesComponent } from '../../work-companies/list-work-companies/list-work-companies.component';
@Component({
  selector: 'app-work-detailes',
  templateUrl: './work-detailes.component.html',
  styleUrls: ['./work-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    BasicDetailesComponent,
    ListItemsComponent,
    ListMediasComponent,
    ExecutionStatusComponent,
    ListBoqsComponent,
    FinancialStatusComponent,
    ListWorkCompaniesComponent,
  ]
})
export class WorkDetailesComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  workId: number = 0;
  referenceType: MediaReferenceTypes = MediaReferenceTypes.Work;
  activeTab: 'basic-details' | 'items' | 'medias' | 'execution-status' | 'financial-status' | 'boqs' | 'companies' = 'basic-details';

  setActiveTab(tab: 'basic-details' | 'items' | 'medias' | 'execution-status' | 'financial-status' | 'boqs' | 'companies') {
    this.activeTab = tab;
  }

  initActiveTab() {
    const fragment = this.activatedRoute.snapshot.fragment;
    switch (fragment) {
      case 'basic-details':
      case 'items':
      case 'medias':
      case 'execution-status':
      case 'financial-status':
      case 'boqs':
      case 'companies':
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
