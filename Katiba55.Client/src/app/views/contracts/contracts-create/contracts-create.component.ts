import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { ContractsService } from '../../../services/contracts.service';

@Component({
  selector: 'app-contracts-create',
  templateUrl: './contracts-create.component.html',
  styleUrls: ['./contracts-create.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    SpinnerComponent
  ]
})
export class ContractsCreateComponent implements OnInit {

  private contractsService: ContractsService = inject(ContractsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  contractForm = this.fb.group({
    number: ['', [Validators.required]],
    value: [null, [Validators.required, Validators.min(0)]],
    status: ['', [Validators.required]]
  });

  boqId: number = 0;
  workId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.boqId = Number(this.activatedRoute.snapshot.queryParamMap.get('boqId'));
    this.workId = Number(this.activatedRoute.snapshot.queryParamMap.get('workId'));
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.contractsService
      .create({ ...this.contractForm.value, boqId: this.boqId })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة العقد بنجاح!', 'success');
          if (this.boqId)
            this.router.navigate([`/boqs/${this.boqId}`], { queryParams: { workId: this.workId }, fragment: 'contract-details' });
          else
            this.router.navigate(['/']);
        }
      });
  }
}