import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { finalize, first } from 'rxjs';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { DecimalPipe } from '@angular/common';
import { DeleteConfirmationModalComponent } from '../../../shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { BOQsService } from '../../../services/BOQs.service';
import { ContractsService } from '../../../services/contracts.service';
import { BOQ } from '../../../models/boqs/BOQ';
import { Contract } from '../../../models/contracts/contract';

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
    DeleteConfirmationModalComponent,
    SpinnerComponent
  ]
})
export class BoqsDetailesComponent implements OnInit {

  private boqsService: BOQsService = inject(BOQsService);
  private contractsService: ContractsService = inject(ContractsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);

  boq: BOQ | null = null;
  contract: Contract | null = null;
  boqId: number = 0;
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: Contract | null = null;

  ngOnInit() {
    this.boqId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadBoq();
    this.loadContract();
  }

  loadBoq() {
    this.boqsService.getById(this.boqId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          this.boq = response.data;
        }
      });
  }

  loadContract() {
    this.contractsService
      .getByBOQId(this.boqId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          this.contract = response.data;
        }
      });
  }

  fireDeleteConfirmationModal(contract: Contract) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = contract;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.contractsService.delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف العمل بنجاح!', 'success');
            this.contract = null;
          }
        });
    }
    else {
      this.deletedItem = null;
    }
  }

}