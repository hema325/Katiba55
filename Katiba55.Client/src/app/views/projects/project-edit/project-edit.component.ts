import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExecutionStatus } from '../../../enums/execution-status.enum';
import { finalize, first } from 'rxjs';
import { OfficerBrief } from '../../../models/officers/officer-brief';
import { ProjectsService } from '../../../services/projects.service';
import { OfficersService } from '../../../services/officers.service';
import { formatInputDate } from '../../../helpers/date.helper';
import { ToasterService } from '../../../services/toaster.service';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { TextAreaInputComponent } from '../../../shared/forms/text-area-input/text-area-input.component';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { fillDefaultObjectPropertiesWithNull } from '../../../helpers/object.helper';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
  imports: [
    RouterLink,
    TextInputComponent,
    TextAreaInputComponent,
    SelectInputComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    SpinnerComponent
  ]
})
export class ProjectEditComponent implements OnInit {

  private projectsService: ProjectsService = inject(ProjectsService);
  private officersService: OfficersService = inject(OfficersService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
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
  projectId: number = 0;
  isSubmitting: boolean = false;

  constructor() { }

  ngOnInit() {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadOfficers();
    this.loadProject();
  }

  loadOfficers() {
    this.officersService.getAll()
      .pipe(first())
      .subscribe(response => this.officers = response.data);
  }

  loadProject() {
    this.projectsService.getById(this.projectId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const project = response.data;

          this.projectForm.patchValue({
            ...project as any,
            estimatedStartDate: formatInputDate(project.estimatedStartDate),
            estimatedEndDate: formatInputDate(project.estimatedEndDate),
            actualStartDate: formatInputDate(project.actualStartDate),
            actualEndDate: formatInputDate(project.actualEndDate),
            executionDate: formatInputDate(project.executionDate),
          });

          this.onExecutionStatusChange(project.executionStatus);
        }
      })
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.projectsService.update(this.projectId, fillDefaultObjectPropertiesWithNull(this.projectForm.value))
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
