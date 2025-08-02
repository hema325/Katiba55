import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';
import { InvoicesService } from '../../../services/invoices.service';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { fillDefaultObjectPropertiesWithNull } from '../../../helpers/object.helper';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';

@Component({
  selector: 'app-invoices-edit',
  templateUrl: './invoices-edit.component.html',
  styleUrls: ['./invoices-edit.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SpinnerComponent,
    SelectInputComponent
  ]
})
export class InvoicesEditComponent implements OnInit {

  private invoicesService: InvoicesService = inject(InvoicesService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  invoiceForm = this.fb.group({
    type: ['', [Validators.required]],
    status: ['', [Validators.required]],
    value: [null, [Validators.required, Validators.min(0)]],
    location: ['']
  });

  invoiceId: number = 0;
  contractId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.invoiceId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.contractId = Number(this.activatedRoute.snapshot.queryParamMap.get('contractId'));
    this.loadInvoice();
  }

  loadInvoice() {
    this.invoicesService.getById(this.invoiceId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const invoice = response.data;
          this.invoiceForm.patchValue({
            ...invoice as any
          });
        }
      });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.invoicesService.update(this.invoiceId, fillDefaultObjectPropertiesWithNull(this.invoiceForm.value))
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل المستخلص بنجاح!', 'success');
          if (this.contractId)
            this.router.navigate([`/contracts/${this.contractId}`], { fragment: 'invoices' });
          else
            this.router.navigate(['/']);
        }
      });
  }
}