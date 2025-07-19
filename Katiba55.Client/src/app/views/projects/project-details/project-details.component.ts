import { Component } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { ExecutionStatusComponent } from './execution-status/execution-status.component';
import { CircularProgressComponent } from '../../../shared/circular-progress/circular-progress.component';
import { ItemsComponent } from './items/items.component';
import { WorksComponent } from './works/works.component';
import { MediasComponent } from './medias/medias.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  imports: [
    ButtonDirective,
    RouterLink,
    BasicDetailsComponent,
    ExecutionStatusComponent,
    ItemsComponent,
    WorksComponent,
    MediasComponent,
    CardComponent,
    CardBodyComponent,
    CircularProgressComponent
  ]
})
export class ProjectDetailsComponent {
  activeTab: 'basic-details' | 'execution-status' | 'financial-status' | 'items' | 'works' | 'medias' = 'basic-details';

  setActiveTab(tab: 'basic-details' | 'execution-status' | 'financial-status' | 'items' | 'works' | 'medias') {
    this.activeTab = tab;
  }
}
