import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { InvoicesService } from '../../../services/invoices.service';
import { fillDefaultObjectPropertiesWithNull } from '../../../helpers/object.helper';

@Component({
  selector: 'app-invoices-create',
  templateUrl: './invoices-create.component.html',
  styleUrls: ['./invoices-create.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SpinnerComponent
  ]
})
export class InvoicesCreateComponent implements OnInit {

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

  contractId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.contractId = Number(this.activatedRoute.snapshot.queryParamMap.get('contractId'));
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.invoicesService
      .create({ ...fillDefaultObjectPropertiesWithNull(this.invoiceForm.value), contractId: this.contractId })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة المستخلص بنجاح!', 'success');
          if (this.contractId)
            this.router.navigate([`/contracts/${this.contractId}`], { fragment: 'invoices' });
          else
            this.router.navigate(['/']);
        }
      });
  }
}