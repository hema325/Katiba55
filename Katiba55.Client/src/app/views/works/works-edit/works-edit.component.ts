import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { CompanyBrief } from 'src/app/models/companies/company-brief';
import { CompaniesService } from 'src/app/services/companies.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { WorksService } from 'src/app/services/works.service';
import { SelectInputComponent } from 'src/app/shared/forms/select-input/select-input.component';
import { TextAreaInputComponent } from 'src/app/shared/forms/text-area-input/text-area-input.component';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';
import { ExecutionStatus } from '../../../enums/execution-status.enum';
import { formatInputDate } from '../../../helpers/date.helper';
import { fillDefaultObjectPropertiesWithNull } from '../../../helpers/object.helper';

@Component({
  selector: 'app-works-edit',
  templateUrl: './works-edit.component.html',
  styleUrls: ['./works-edit.component.css'],
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
export class WorksEditComponent implements OnInit {

  private worksService: WorksService = inject(WorksService);
  private companiesService: CompaniesService = inject(CompaniesService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  workForm = this.fb.group({
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
    responsibleId: ['', [Validators.required]],
    notes: ['']
  })

  companies: CompanyBrief[] = [];
  workId: number = 0;
  projectId: number = 0;
  isSubmitting: boolean = false;


  ngOnInit() {
    this.workId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.projectId = Number(this.activatedRoute.snapshot.queryParamMap.get('projectId'));
    this.loadCompanies();
    this.loadWork();
  }

  loadCompanies() {
    this.companiesService.getAll()
      .pipe(first())
      .subscribe(response => this.companies = response.data);
  }

  loadWork() {
    this.worksService.getById(this.workId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const work = response.data;

          this.workForm.patchValue({
            ...work as any,
            estimatedStartDate: formatInputDate(work.estimatedStartDate),
            estimatedEndDate: formatInputDate(work.estimatedEndDate),
            actualStartDate: formatInputDate(work.actualStartDate),
            actualEndDate: formatInputDate(work.actualEndDate),
            executionDate: formatInputDate(work.executionDate),
          });
          this.onExecutionStatusChange(work.executionStatus);
        }
      })
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.worksService.update(this.workId, { ...fillDefaultObjectPropertiesWithNull(this.workForm.value) })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل العمل بنجاح!', 'success');
          if (this.projectId)
            this.router.navigate([`/projects/${this.projectId}`], { fragment: 'works' });
          else
            this.router.navigate(['/']);
        }
      });
  }


  onExecutionStatusChange(status: any) {
    const executionPercentControl = this.workForm.get('executionPercent');
    const executionDateControl = this.workForm.get('executionDate');

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
