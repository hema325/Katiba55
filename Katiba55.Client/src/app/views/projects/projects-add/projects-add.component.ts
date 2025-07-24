import { Component, inject, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { OfficersService } from '../../../services/officers.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OfficerBrief } from '../../../models/officers/officer-brief';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { TextAreaInputComponent } from '../../../shared/forms/text-area-input/text-area-input.component';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { ExecutionStatus } from '../../../enums/execution-status.enum';

@Component({
  selector: 'app-projects-add',
  templateUrl: './projects-add.component.html',
  styleUrls: ['./projects-add.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    TextAreaInputComponent,
    SelectInputComponent,
    SpinnerComponent
  ]
})
export class ProjectsAddComponent implements OnInit {

  private projectsService: ProjectsService = inject(ProjectsService);
  private officersService: OfficersService = inject(OfficersService);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  projectForm = this.fb.group({
    name: ['', [Validators.required]],
    executingSide: [null],
    benefitingSide: [null],
    estimatedCost: [null],
    financialAllocation: [null],
    estimatedStartDate: [null],
    estimatedEndDate: [null],
    actualStartDate: [null],
    actualEndDate: [null],
    address: [null],
    latitude: [null],
    longitude: [null],
    executionPercent: [{ value: null, disabled: true }],
    executionDate: [{ value: null, disabled: true }],
    executionStatus: ['', [Validators.required]],
    supervisorId: ['', [Validators.required]],
    notes: [null]
  });

  officers: OfficerBrief[] = [];
  isSubmitting: boolean = false;


  ngOnInit() {
    this.loadOfficers();
  }

  loadOfficers() {
    this.officersService.getAll()
      .pipe(first())
      .subscribe(response => this.officers = response.data);
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.projectsService.create(this.projectForm.value)
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة المشروع بنجاح!', 'success');
          this.router.navigate([`/projects`]);
        }
      });
  }

  onExecutionStatusChange(status: any) {
    const executionPercentControl = this.projectForm.get('executionPercent');
    const executionDateControl = this.projectForm.get('executionDate');

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
