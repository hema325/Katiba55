import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { ToasterService } from 'src/app/services/toaster.service';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';
import { ContractsService } from '../../../services/contracts.service';
import { fillDefaultObjectPropertiesWithNull } from '../../../helpers/object.helper';

@Component({
  selector: 'app-contracts-edit',
  templateUrl: './contracts-edit.component.html',
  styleUrls: ['./contracts-edit.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SpinnerComponent
  ]
})
export class ContractsEditComponent implements OnInit {

  private contractsService: ContractsService = inject(ContractsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  contractForm = this.fb.group({
    number: [''],
    value: [null, [Validators.min(0)]],
    status: ['', [Validators.required]]
  });

  contractId: number = 0;
  boqId: number = 0;
  workId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.contractId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.boqId = Number(this.activatedRoute.snapshot.queryParamMap.get('boqId'));
    this.workId = Number(this.activatedRoute.snapshot.queryParamMap.get('workId'));
    this.loadContract();
  }

  loadContract() {
    this.contractsService.getById(this.contractId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const contract = response.data;
          this.contractForm.patchValue({
            ...contract as any
          });
        }
      });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.contractsService.update(this.contractId, fillDefaultObjectPropertiesWithNull(this.contractForm.value))
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل العقد بنجاح!', 'success');
          if (this.boqId)
            this.router.navigate([`/boqs/${this.boqId}`], { queryParams: { workId: this.workId }, fragment: 'contract-details' });
          else
            this.router.navigate(['/']);
        }
      });
  }
}