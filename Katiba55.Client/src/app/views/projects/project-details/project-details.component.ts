import { Component, inject, OnInit } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent } from '@coreui/angular';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { ExecutionStatusComponent } from './execution-status/execution-status.component';
import { CircularProgressComponent } from '../../../shared/circular-progress/circular-progress.component';
import { ListWorksComponent } from '../../works/list-works/list-works.component';
import { ListMediasComponent } from '../../medias/list-medias/list-medias.component';
import { MediaReferenceTypes } from 'src/app/enums/media-reference-types.enum';
import { FinancialStatusComponent } from './financial-status/financial-status.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  imports: [
    ButtonDirective,
    RouterLink,
    BasicDetailsComponent,
    ExecutionStatusComponent,
    CardComponent,
    CardBodyComponent,
    CircularProgressComponent,
    RouterOutlet,
    ListWorksComponent,
    ListMediasComponent,
    FinancialStatusComponent
  ]
})
export class ProjectDetailsComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  projectId: number = 0;
  referenceType: MediaReferenceTypes = MediaReferenceTypes.Project;

  activeTab: 'basic-details' | 'execution-status' | 'financial-status' | 'works' | 'medias' = 'basic-details';

  ngOnInit() {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initActiveTab();
  }

  initActiveTab() {
    const fragment = this.activatedRoute.snapshot.fragment;
    switch (fragment) {
      case 'basic-details':
      case 'execution-status':
      case 'financial-status':
      case 'works':
      case 'medias':
        this.activeTab = fragment;
        break;
      default:
        this.activeTab = 'basic-details';
    }
  }


  setActiveTab(tab: 'basic-details' | 'execution-status' | 'financial-status' | 'works' | 'medias') {
    this.activeTab = tab;
  }

}
