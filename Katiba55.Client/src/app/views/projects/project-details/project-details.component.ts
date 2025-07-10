import { Component } from '@angular/core';
import { ButtonDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { ExecutionStatusComponent } from './execution-status/execution-status.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  imports: [
    ButtonDirective,
    RouterLink,
    BasicDetailsComponent,
    ExecutionStatusComponent
  ]
})
export class ProjectDetailsComponent {


}
