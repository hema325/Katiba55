import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BadgeComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, PageItemComponent, PageLinkDirective, PopoverDirective, ProgressBarComponent, ProgressComponent, RowComponent, TableDirective, ThemeDirective, TooltipDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { ToasterService } from '../../../services/toaster.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { RouterLink } from '@angular/router';

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
    ProgressComponent,
    DeleteConfirmationModalComponent,
    RouterLink
  ]
})
export class ListProjectsComponent implements OnInit {

  toasterService = inject(ToasterService);
  deleteConfirmationModalVisible: boolean = false;

  // dummy props
  currentPage: any = 1;
  date = new Date();



  constructor() { }

  ngOnInit() {
  }





  fireDeleteConfirmationModal() {
    this.deleteConfirmationModalVisible = true;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.toasterService.showToast('نجاح', 'تم حذف المشروع بنجاح!', 'success');
    }
  }

}
