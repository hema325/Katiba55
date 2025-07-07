import { Component, inject, OnInit } from '@angular/core';
import { ToasterService } from '../../../services/toaster.service';
import { RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, PageItemComponent, ProgressComponent, RowComponent, TableDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-list-officers',
  templateUrl: './list-officers.component.html',
  styleUrls: ['./list-officers.component.css'],
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
    PageItemComponent,
    PaginatorComponent,
    BadgeComponent,
    ProgressComponent,
    DeleteConfirmationModalComponent,
    RouterLink
  ]
})
export class ListOfficersComponent implements OnInit {

  private toasterService: ToasterService = inject(ToasterService);
  deleteConfirmationModalVisible: boolean = false;
  currentPage: number = 1;

  constructor() { }

  ngOnInit() {
  }


  fireDeleteConfirmationModal() {
    this.deleteConfirmationModalVisible = true;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.toasterService.showToast('نجاح', 'تم حذف الضابط بنجاح!', 'success');
    }
  }

}
