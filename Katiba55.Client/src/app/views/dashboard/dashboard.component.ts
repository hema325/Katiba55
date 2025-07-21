import { Component, OnInit } from '@angular/core';
import { ListProjectsComponent } from '../projects/list-projects/list-projects.component';
import { ListCompaniesComponent } from '../companies/list-companies/list-companies.component';
import { ListOfficersComponent } from '../officers/list-officers/list-officers.component';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  imports:
    [
      ListProjectsComponent,
      ListCompaniesComponent,
      ListOfficersComponent,
      CardComponent,
      CardBodyComponent,
      CardHeaderComponent,
      RouterLink
    ]
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
  }

  activeTab: 'projects' | 'companies' | 'officers' = 'projects';

  setActiveTab(tab: 'projects' | 'companies' | 'officers') {
    this.activeTab = tab;
  }
}
