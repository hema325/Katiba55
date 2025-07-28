import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { ExecutionStatus } from 'src/app/enums/execution-status.enum';
import { formatInputDate } from 'src/app/helpers/date.helper';
import { ItemsService } from 'src/app/services/items.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { SelectInputComponent } from 'src/app/shared/forms/select-input/select-input.component';
import { TextAreaInputComponent } from 'src/app/shared/forms/text-area-input/text-area-input.component';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';
import { fillDefaultObjectPropertiesWithNull } from '../../../helpers/object.helper';

@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ReactiveFormsModule,
    TextInputComponent,
    TextAreaInputComponent,
    SelectInputComponent,
    SpinnerComponent
  ]
})
export class ItemsEditComponent implements OnInit {

  private itemsService: ItemsService = inject(ItemsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  itemForm = this.fb.group({
    name: ['', [Validators.required]],
    totalValue: [null],
    executedValue: [null],
    remainingValue: [null],
    relativeWeightPercent: [null, [Validators.min(0), Validators.max(100)]],
    executionPercent: [{ value: null, disabled: true }],
    executionDate: [{ value: null, disabled: true }],
    executionStatus: ['', [Validators.required]],
    estimatedStartDate: [null],
    estimatedEndDate: [null],
    actualStartDate: [null],
    actualEndDate: [null],
    notes: ['']
  });

  itemId: number = 0;
  workId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.itemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.workId = Number(this.activatedRoute.snapshot.queryParamMap.get('workId'));
    this.loadItem();
  }

  loadItem() {
    this.itemsService.getById(this.itemId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const item = response.data;
          this.itemForm.patchValue({
            ...response.data as any,
            estimatedStartDate: formatInputDate(item.estimatedStartDate),
            estimatedEndDate: formatInputDate(item.estimatedEndDate),
            actualStartDate: formatInputDate(item.actualStartDate),
            actualEndDate: formatInputDate(item.actualEndDate),
            executionDate: formatInputDate(item.executionDate),
          });

          this.onExecutionStatusChange(item.executionStatus);
        }
      });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.itemsService.update(this.itemId, fillDefaultObjectPropertiesWithNull(this.itemForm.value))
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل البند بنجاح!', 'success');
          if (this.workId)
            this.router.navigate([`/works/${this.workId}`], { fragment: 'items' });
          else
            this.router.navigate(['/']);
        }
      });
  }

  onExecutionStatusChange(status: any) {
    const executionPercentControl = this.itemForm.get('executionPercent');
    const executionDateControl = this.itemForm.get('executionDate');

    if (status === ExecutionStatus.Pending) {
      executionPercentControl?.clearValidators();
      executionPercentControl?.disable();
      executionPercentControl?.reset();

      executionDateControl?.clearValidators();
      executionDateControl?.disable();
      executionDateControl?.reset();
    } else {
      executionPercentControl?.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      executionPercentControl?.enable();

      executionDateControl?.setValidators([Validators.required]);
      executionDateControl?.enable();
    }

    executionPercentControl?.updateValueAndValidity();
    executionDateControl?.updateValueAndValidity();
  }
}
