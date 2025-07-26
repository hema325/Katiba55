import { Component, inject, OnInit } from '@angular/core';
import { BasicDetailesComponent } from './basic-detailes/basic-detailes.component';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { ListInvoicesComponent } from '../../invoices/list-invoices/list-invoices.component';

@Component({
  selector: 'app-contracts-detailes',
  templateUrl: './contracts-detailes.component.html',
  styleUrls: ['./contracts-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    BasicDetailesComponent,
    ListInvoicesComponent
  ]
})
export class ContractsDetailesComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  activeTab: string = 'basic-detailes';
  contractId: number = 0;

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit() {
    this.contractId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initActiveTab();
  }

  initActiveTab() {
    const fragment = this.activatedRoute.snapshot.fragment;
    switch (fragment) {
      case 'basic-detailes':
      case 'invoices':
      case 'advances':
        this.activeTab = fragment;
        break;
      default:
        this.activeTab = 'basic-detailes';
    }
  }
}
