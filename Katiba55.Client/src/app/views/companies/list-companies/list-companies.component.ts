import { Component, inject, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, PageItemComponent, ProgressComponent, RowComponent, SpinnerComponent, TableDirective, TooltipDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { RouterLink } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { ToasterService } from '../../../services/toaster.service';
import { CompanyBrief } from '../../../models/companies/company-brief';
import { CompaniesService } from '../../../services/companies.service';
import { finalize, first } from 'rxjs';
import { CompanyStatus } from '../../../enums/company-status.enum';
import { CompanyStatusPipe } from '../../../pipes/company-status.pipe';

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
    RouterLink,
    TooltipDirective,
    CompanyStatusPipe,
    SpinnerComponent
  ]
})
export class ListCompaniesComponent implements OnInit {

  private companiesService: CompaniesService = inject(CompaniesService);
  private toasterService: ToasterService = inject(ToasterService);

  companies: CompanyBrief[] = [];
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: CompanyBrief | null = null;
  isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    this.companiesService.getAll()
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.companies = response.data);
  }


  fireDeleteConfirmationModal(company: CompanyBrief) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = company;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.companiesService
        .delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف الشركة بنجاح!', 'success');
            this.companies = this.companies.filter(o => o.id !== this.deletedItem!.id);
          }
        });
    }
    else {
      this.deletedItem = null
    }
  }

  getStatusBadgeColor(status: string): string {
    switch (status) {
      case CompanyStatus.Approved:
        return 'success';
      case CompanyStatus.Unapproved:
        return 'danger';
      default:
        return 'info';
    }
  }

}
