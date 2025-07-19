import { Component, inject, OnInit } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, FormControlDirective, FormDirective, FormFeedbackComponent, FormLabelDirective, FormModule, FormSelectDirective, SpinnerComponent } from '@coreui/angular';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { TextAreaInputComponent } from '../../../shared/forms/text-area-input/text-area-input.component';
import { phoneValidator } from '../../../validators/phone-validator';
import { OfficersService } from '../../../services/officers.service';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';
import { OfficerStatus } from '../../../enums/officer-status.enum';

@Component({
  selector: 'app-officers-add',
  templateUrl: './officers-add.component.html',
  styleUrls: ['./officers-add.component.css'],
  imports: [
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    FormFeedbackComponent,
    ReactiveFormsModule,
    ButtonDirective,
    TextInputComponent,
    SelectInputComponent,
    TextAreaInputComponent,
    SpinnerComponent
  ]
})
export class OfficersAddComponent implements OnInit {

  private officersService: OfficersService = inject(OfficersService);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  officerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: [null, [Validators.email]],
    phone: [null, [phoneValidator()]],
    rank: ['', [Validators.required]],
    status: ['', [Validators.required]],
    joinDate: [{ value: null, disabled: true }],
    leaveDate: [{ value: null, disabled: true }],
    notes: [null]
  });
  isSubmitting: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.officersService.create(this.officerForm.value)
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة الضابط بنجاح!', 'success');
          this.router.navigate([`/officers`]);
        }
      });
  }

  onStatusChange(status: any) {
    const joinDateControl = this.officerForm.get('joinDate');
    const leaveDateControl = this.officerForm.get('leaveDate');

    if (status === OfficerStatus.InBattalion) {
      joinDateControl?.setValidators([Validators.required]);
      leaveDateControl?.setValidators(null);
      leaveDateControl?.disable();
      leaveDateControl?.reset();
    } else {
      leaveDateControl?.setValidators([Validators.required]);
      leaveDateControl?.enable();
    }

    joinDateControl?.enable();
    leaveDateControl?.updateValueAndValidity();
  }

}
