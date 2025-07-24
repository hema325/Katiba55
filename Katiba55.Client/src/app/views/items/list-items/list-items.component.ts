import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ProgressComponent, SpinnerComponent, TooltipDirective } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { getExecutionProgressColor, getExecutionStatusBadgeColor } from 'src/app/helpers/execution-status.helper';
import { ItemBrief } from 'src/app/models/items/item-brief';
import { ExecutionStatusPipe } from 'src/app/pipes/execution-status.pipe';
import { ItemsService } from 'src/app/services/items.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ButtonDirective,
    SpinnerComponent,
    RouterLink,
    TooltipDirective,
    BadgeComponent,
    DeleteConfirmationModalComponent,
    ExecutionStatusPipe,
    DatePipe,
    ProgressComponent,
    RouterLink
  ]
})
export class ListItemsComponent implements OnInit {

  private itemsService: ItemsService = inject(ItemsService);
  private toasterService: ToasterService = inject(ToasterService);

  @Input() workId: number = 0;

  items: ItemBrief[] = [];
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: ItemBrief | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.itemsService.getByWorkId(this.workId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.items = response.data);
  }

  fireDeleteConfirmationModal(project: ItemBrief) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = project;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.itemsService.delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف البند بنجاح!', 'success');
            this.items = this.items.filter(p => p.id !== this.deletedItem!.id);
          }
        })
    }
    else {
      this.deletedItem = null;
    }
  }

  getExecutionStatusBadgeColor(status: any): string {
    return getExecutionStatusBadgeColor(status);
  }

  getExecutionProgressColor(percent: number): string {
    return getExecutionProgressColor(percent);
  }
}
