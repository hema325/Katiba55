import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EditBasicDetailsComponent } from './edit-basic-details/edit-basic-details.component';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { EditItemsComponent } from './edit-items/edit-items.component';
import { EditWorksComponent } from './edit-works/edit-works.component';
import { EditMediasComponent } from './edit-medias/edit-medias.component';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
  imports: [
    RouterLink,
    EditBasicDetailsComponent,
    EditItemsComponent,
    EditWorksComponent,
    EditMediasComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent
  ]
})
export class ProjectEditComponent implements OnInit {

  activeTab: 'basic-details' | 'items' | 'works' | 'medias' = 'basic-details';

  ngOnInit(): void {
  }


  setActiveTab(tab: 'basic-details' | 'items' | 'works' | 'medias') {
    this.activeTab = tab;
  }

}
