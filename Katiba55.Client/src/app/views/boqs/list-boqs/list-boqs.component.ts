import { Component, inject, Input, OnInit } from '@angular/core';
import { BOQsService } from '../../../services/BOQs.service';
import { BOQ } from '../../../models/boqs/BOQ';
import { finalize, first } from 'rxjs';
import { BadgeComponent, CardBodyComponent, CardComponent, SpinnerComponent, TooltipDirective } from '@coreui/angular';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { DeleteConfirmationModalComponent } from '../../../shared/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-list-boqs',
  templateUrl: './list-boqs.component.html',
  styleUrls: ['./list-boqs.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    DecimalPipe,
    RouterLink,
    TooltipDirective,
    BadgeComponent,
    SpinnerComponent,
    DeleteConfirmationModalComponent
  ]
})
export class ListBoqsComponent implements OnInit {

  private boqsService: BOQsService = inject(BOQsService);
  private toasterService: ToasterService = inject(ToasterService);

  @Input() workId: number = 0;

  boqs: BOQ[] = [];
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: BOQ | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    this.loadBOQs();
  }

  private loadBOQs() {
    this.isLoading = true;
    this.boqsService.getByWorkId(this.workId)
      .pipe(finalize(() => { this.isLoading = false; }), first())
      .subscribe(result => this.boqs = result.data);
  }

  fireDeleteConfirmationModal(work: BOQ) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = work;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.boqsService.delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف المقايسة بنجاح!', 'success');
            this.boqs = this.boqs.filter(p => p.id !== this.deletedItem!.id);
          }
        });
    }
    else {
      this.deletedItem = null;
    }
  }
}
