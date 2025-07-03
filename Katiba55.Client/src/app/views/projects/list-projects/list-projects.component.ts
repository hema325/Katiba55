import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, PageItemComponent, PageLinkDirective, ProgressBarComponent, ProgressComponent, RowComponent, TableDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css'],
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    TableDirective,
    ButtonDirective,
    IconDirective,
    DatePipe,
    PageItemComponent,
    PaginatorComponent,
    BadgeComponent,
    ProgressComponent
  ]
})
export class ListProjectsComponent implements OnInit {

  currentPage: any = 1;
  date = new Date();
  constructor() { }

  ngOnInit() {
  }


  toasterService = inject(ToasterService);
  test() {
    this.toasterService.showToast('مرحباا', 'هذه هي رسالة تجريبية!', '');
  }


}
