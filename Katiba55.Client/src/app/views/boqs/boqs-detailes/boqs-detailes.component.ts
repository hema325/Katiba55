import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { finalize, first } from 'rxjs';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { DecimalPipe } from '@angular/common';
import { DeleteConfirmationModalComponent } from '../../../shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { BOQsService } from '../../../services/BOQs.service';

@Component({
  selector: 'app-boqs-detailes',
  templateUrl: './boqs-detailes.component.html',
  styleUrls: ['./boqs-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DecimalPipe,
    RouterLink,
    DeleteConfirmationModalComponent
  ]
})
export class BoqsDetailesComponent implements OnInit {

  private boqsService: BOQsService = inject(BOQsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);

  boq: any;
  deleteConfirmationModalVisible: boolean = false;

  ngOnInit() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadBoq(id);
  }

  loadBoq(id: number) {
    this.boqsService.getById(id)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          this.boq = response.data;
        }
      });
  }

  fireDeleteConfirmationModal(boq: any) {
    this.deleteConfirmationModalVisible = true;
  }

  handleDeleteConfirmationModalChange(confirmed: boolean) {
    if (confirmed && this.boq?.id) {
      this.boqsService.delete(this.boq.id)
        .pipe(finalize(() => this.deleteConfirmationModalVisible = false), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف المقايسة بنجاح!', 'success');
            this.router.navigate(['/boqs']);
          }
        });
    } else {
      this.deleteConfirmationModalVisible = false;
    }
  }

}