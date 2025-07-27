import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { ItemDetailed } from 'src/app/models/items/item-detailed';
import { ItemsService } from 'src/app/services/items.service';
import { CircularProgressComponent } from 'src/app/shared/circular-progress/circular-progress.component';
import { getExecutionStatusBadgeColor } from '../../../../helpers/execution-status.helper';
import { ExecutionStatusPipe } from '../../../../pipes/execution-status.pipe';
import { ToasterService } from 'src/app/services/toaster.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-basic-detailes',
  templateUrl: './basic-detailes.component.html',
  styleUrls: ['./basic-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ExecutionStatusPipe,
    DatePipe,
    DecimalPipe,
    CircularProgressComponent,
    BadgeComponent,
    SpinnerComponent,
    RouterLink,
    DeleteConfirmationModalComponent
  ]
})
export class BasicDetailesComponent implements OnInit {

  private itemsService: ItemsService = inject(ItemsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private toasterService = inject(ToasterService);
  private router: Router = inject(Router);

  item: ItemDetailed | null = null;
  itemId: number = 0;
  workId: number = 0;
  isLoading: boolean = false;
  deleteConfirmationModalVisible: boolean = false;
  isDeleting: boolean = false;


  ngOnInit() {
    this.itemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.workId = Number(this.activatedRoute.snapshot.queryParamMap.get('workId'));
    this.loadItem();
  }

  loadItem() {
    this.isLoading = true;
    this.itemsService.getDetailedById(this.itemId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.item = response.data);
  }

  getExecutionStatusBadgeColor(status: any): string {
    return getExecutionStatusBadgeColor(status);
  }

  fireDeleteConfirmationModal() {
    this.isDeleting = true;
    this.deleteConfirmationModalVisible = true;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.itemsService
        .delete(this.itemId)
        .pipe(finalize(() => this.isDeleting = false), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف البند بنجاح!', 'success');
            if (this.workId)
              this.router.navigate(['/works', this.workId], { fragment: 'items' });
            else
              this.router.navigate(['/']);
          }
        });
    }
    else {
      this.isDeleting = false
    }
  }
}
