import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, RowComponent, SpinnerComponent } from '@coreui/angular';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { TextAreaInputComponent } from '../../../shared/forms/text-area-input/text-area-input.component';
import { phoneValidator } from '../../../validators/phone-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficersService } from '../../../services/officers.service';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';
import { formatInputDate } from '../../../helpers/date.helper';
import { OfficerStatus } from '../../../enums/officer-status.enum';

@Component({
  selector: 'app-officers-edit',
  templateUrl: './officers-edit.component.html',
  styleUrls: ['./officers-edit.component.css'],
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    BadgeComponent,
    ButtonDirective,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    TextAreaInputComponent,
    SpinnerComponent
  ]
})
export class OfficersEditComponent implements OnInit {

  private officersService: OfficersService = inject(OfficersService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
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
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  officerId: number = 0;

  constructor() { }

  ngOnInit() {

    this.officerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadOfficer();
  }

  loadOfficer() {
    this.isLoading = true;
    this.officersService.getById(this.officerId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => {
        if (response.success) {
          this.officerForm.patchValue({ ...response.data as any, joinDate: formatInputDate(response.data.joinDate), leaveDate: formatInputDate(response.data.leaveDate) });
          this.onStatusChange(response.data.status);
        }
      });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.officersService.update(this.officerId!, this.officerForm.value)
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل الضابط بنجاح!', 'success');
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
