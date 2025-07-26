import { Component, inject, OnInit } from '@angular/core';
import { BasicDetailesComponent } from './basic-detailes/basic-detailes.component';
import { ActivatedRoute } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-contracts-detailes',
  templateUrl: './contracts-detailes.component.html',
  styleUrls: ['./contracts-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    BasicDetailesComponent
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
  }

}
