import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { ExecutionStatusPipe } from 'src/app/pipes/execution-status.pipe';
import { CircularProgressComponent } from 'src/app/shared/circular-progress/circular-progress.component';
import { ContractsService } from 'src/app/services/contracts.service';
import { Contract } from 'src/app/models/contracts/contract';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-basic-detailes',
  templateUrl: './basic-detailes.component.html',
  styleUrls: ['./basic-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CircularProgressComponent,
    DatePipe,
    ExecutionStatusPipe,
    DecimalPipe,
    RouterLink,
    SpinnerComponent,
    DeleteConfirmationModalComponent
  ]
})
export class BasicDetailesComponent implements OnInit {

  private contractsService: ContractsService = inject(ContractsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private toasterService = inject(ToasterService);
  private router: Router = inject(Router);

  contract: Contract | null = null;
  id: number = 0;
  boqId: number = 0;
  deleteConfirmationModalVisible: boolean = false;
  isDeleting: boolean = false;


  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.boqId = Number(this.activatedRoute.snapshot.queryParamMap.get("boqId"));
    this.loadContract();
  }

  loadContract() {
    this.contractsService.getById(this.id)
      .pipe(first())
      .subscribe(response => this.contract = response.data);
  }

  fireDeleteConfirmationModal() {
    this.isDeleting = true;
    this.deleteConfirmationModalVisible = true;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.contractsService
        .delete(this.id)
        .pipe(finalize(() => this.isDeleting = false), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف العقد بنجاح!', 'success');
            if (this.boqId)
              this.router.navigate(['/boqs', this.boqId]);
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