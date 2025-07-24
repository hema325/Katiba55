import { Component, inject, OnInit } from '@angular/core';
import { BasicDetailesComponent } from './basic-detailes/basic-detailes.component';
import { CardBodyComponent, CardComponent } from '@coreui/angular';
import { MediaReferenceTypes } from 'src/app/enums/media-reference-types.enum';
import { ActivatedRoute } from '@angular/router';
import { ListMediasComponent } from '../../medias/list-medias/list-medias.component';

@Component({
  selector: 'app-item-detailes',
  templateUrl: './item-detailes.component.html',
  styleUrls: ['./item-detailes.component.css'],
  imports: [
    BasicDetailesComponent,
    CardComponent,
    CardBodyComponent,
    ListMediasComponent
  ]
})
export class ItemDetailesComponent implements OnInit {

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  itemId: number = 0;
  referenceType: MediaReferenceTypes = MediaReferenceTypes.Item;
  activeTab: 'basic-details' | 'medias' = 'basic-details';

  ngOnInit() {
    this.itemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initActiveTab();
  }

  initActiveTab() {
    const fragment = this.activatedRoute.snapshot.fragment;
    switch (fragment) {
      case 'basic-details':
      case 'medias':
        this.activeTab = fragment;
        break;
      default:
        this.activeTab = 'basic-details';
    }
  }

  setActiveTab(tab: 'basic-details' | 'medias') {
    this.activeTab = tab;
  }

}
