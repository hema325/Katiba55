import { Component, inject, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, PageItemComponent, ProgressComponent, RowComponent, TableDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { RouterLink } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css'],
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
export class ListCompaniesComponent implements OnInit {

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
      this.toasterService.showToast('نجاح', 'تم حذف الشركة بنجاح!', 'success');
    }
  }

}
