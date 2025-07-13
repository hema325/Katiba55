import { NgStyle } from '@angular/common';
import { Component, DestroyRef, DOCUMENT, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  BadgeComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TemplateIdDirective,
  TooltipDirective,
  WidgetStatBComponent,
  WidgetStatFComponent
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { RouterLink } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { CompaniesComponent } from './companies/companies.component';
import { OfficersComponent } from './officers/officers.component';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  imports:
    [
      WidgetStatFComponent,
      TemplateIdDirective,
      CardComponent,
      CardBodyComponent,
      RowComponent,
      ColComponent,
      ButtonDirective,
      IconDirective,
      ReactiveFormsModule,
      ButtonGroupComponent,
      FormCheckLabelDirective,
      ChartjsComponent,
      NgStyle,
      CardFooterComponent,
      GutterDirective,
      ProgressComponent,
      WidgetsBrandComponent,
      CardHeaderComponent,
      TableDirective,
      AvatarComponent,
      RouterLink,
      BadgeComponent,
      TooltipDirective,
      ProjectsComponent,
      CompaniesComponent,
      OfficersComponent]
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
  }

  activeTab: 'projects' | 'companies' | 'officers' = 'projects';

  setActiveTab(tab: 'projects' | 'companies' | 'officers') {
    this.activeTab = tab;
  }
}
