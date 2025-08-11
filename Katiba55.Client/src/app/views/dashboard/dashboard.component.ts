import { Component, OnInit } from '@angular/core';
import { ListProjectsComponent } from '../projects/list-projects/list-projects.component';
import { ListCompaniesComponent } from '../companies/list-companies/list-companies.component';
import { ListOfficersComponent } from '../officers/list-officers/list-officers.component';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { FinancialStatusComponent } from '../financial-status/financial-status.component';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  imports:
    [
      ListProjectsComponent,
      ListCompaniesComponent,
      ListOfficersComponent,
      FinancialStatusComponent,
      CardComponent,
      CardBodyComponent,
      CardHeaderComponent,
      RouterLink
    ]
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
  }

  activeTab: 'projects' | 'companies' | 'officers' | 'financial-status' = 'projects';

  setActiveTab(tab: 'projects' | 'companies' | 'officers' | 'financial-status') {
    this.activeTab = tab;
  }
}
