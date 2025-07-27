import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorksService } from '../../../services/works.service';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { TextAreaInputComponent } from '../../../shared/forms/text-area-input/text-area-input.component';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { CompaniesService } from '../../../services/companies.service';
import { CompanyBrief } from '../../../models/companies/company-brief';
import { ExecutionStatus } from '../../../enums/execution-status.enum';

@Component({
  selector: 'app-works-create',
  templateUrl: './works-create.component.html',
  styleUrls: ['./works-create.component.css'],
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
export class WorksCreateComponent implements OnInit {

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
  projectId: number = 0;
  isSubmitting: boolean = false;


  ngOnInit() {
    this.projectId = Number(this.activatedRoute.snapshot.queryParamMap.get('projectId'));
    this.loadCompanies();
  }

  loadCompanies() {
    this.companiesService.getAll()
      .pipe(first())
      .subscribe(response => this.companies = response.data);
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.worksService.create({ ...this.workForm.value, projectId: this.projectId })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة العمل بنجاح!', 'success');
          this.router.navigate([`/projects/${this.projectId}`], { fragment: 'works' });
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
