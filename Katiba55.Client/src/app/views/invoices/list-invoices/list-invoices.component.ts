import { Component, inject, Input, OnInit } from '@angular/core';
import { InvoicesService } from '../../../services/invoices.service';
import { Invoice } from '../../../models/invoices/invoice';
import { finalize, first } from 'rxjs';
import { CardComponent, CardBodyComponent, SpinnerComponent, BadgeComponent, TooltipDirective } from '@coreui/angular';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { DeleteConfirmationModalComponent } from '../../../shared/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    RouterLink,
    TooltipDirective,
    BadgeComponent,
    SpinnerComponent,
    DeleteConfirmationModalComponent,
    DecimalPipe,
  ]
})
export class ListInvoicesComponent implements OnInit {

  private invoicesService: InvoicesService = inject(InvoicesService);
  private toasterService: ToasterService = inject(ToasterService);

  @Input() contractId: number = 0;

  invoices: Invoice[] = [];
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: Invoice | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    this.loadInvoices();
  }

  private loadInvoices() {
    this.isLoading = true;
    this.invoicesService.getByContractId(this.contractId)
      .pipe(finalize(() => { this.isLoading = false; }), first())
      .subscribe(result => this.invoices = result.data);
  }

  fireDeleteConfirmationModal(invoice: Invoice) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = invoice;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event && this.deletedItem) {
      this.invoicesService.delete(this.deletedItem.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف المستخلص بنجاح!', 'success');
            this.invoices = this.invoices.filter(p => p.id !== this.deletedItem!.id);
          }
        });
    } else {
      this.deletedItem = null;
    }
  }
}