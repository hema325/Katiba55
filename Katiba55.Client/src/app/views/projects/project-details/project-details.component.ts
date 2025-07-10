import { Component } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { ExecutionStatusComponent } from './execution-status/execution-status.component';
import { CircularProgressComponent } from '../../../shared/circular-progress/circular-progress.component';

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
    CircularProgressComponent
  ]
})
export class ProjectDetailsComponent {
  activeTab: 'basic-details' | 'execution-status' | 'financial-status' = 'basic-details';

  setActiveTab(tab: 'basic-details' | 'execution-status' | 'financial-status') {
    this.activeTab = tab;
  }

  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
