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
      TooltipDirective]
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
  }

  months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  get randomData() {
    return Math.round(Math.random() * 100);
  }

  options = {
    maintainAspectRatio: false
  };

  chartBarData: ChartData = {
    labels: ['حسب اللة الكفراوى', 'ممشى اهل مصر', 'الدلتا الجديدة', 'الطريق الساحلى'].slice(0, 7),
    datasets: [
      {
        label: 'نسبة التنفيذ',
        backgroundColor: '#f87979',
        data: [100, 80, 50, 25]
      }
    ]
  };

  chartLineData: ChartData = {
    labels: [...this.months].slice(0, 7),
    datasets: [
      {
        label: 'ممشى اهل مصر',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(220, 220, 220, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: '#fff',
        data: [0, 10, 40, 50, 60, 100, 100]
      },
      {
        label: 'الطريق الساحلى',
        backgroundColor: 'rgba(151, 187, 205, 0.2)',
        borderColor: 'rgba(151, 187, 205, 1)',
        pointBackgroundColor: 'rgba(151, 187, 205, 1)',
        pointBorderColor: '#fff',
        data: [0, 25, 30, 30, 50, 80, 100]
      },
      {
        label: 'الدلتا الجديدة',
        backgroundColor: 'rgba(248, 121, 121, 0.2)',
        borderColor: 'rgba(248, 121, 121, 1)',
        pointBackgroundColor: 'rgba(248, 121, 121, 1)',
        pointBorderColor: '#fff',
        data: [0, 50, 80, 90, 100, 100, 100]
      }
    ]
  };

  chartPieData: ChartData = {
    labels: ['مكتمل', 'تحت الانشاء', 'متوقف'],
    datasets: [
      {
        data: [100, 50, 20],
        backgroundColor: ['#41B883', '#FFCE56', '#E46651'],
        hoverBackgroundColor: ['#41B883', '#FFCE56', '#E46651']
      }
    ]
  };

  chartDoughnutData: ChartData = {
    labels: ['ضباط على قوة الكتيبة', 'ضباط ليست على قوت الكتيبة'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651'],
        data: [100, 20]
      }
    ]
  };
}
