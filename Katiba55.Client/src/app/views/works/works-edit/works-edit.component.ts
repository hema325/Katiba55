import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { formatInputDate } from 'src/app/helpers/format-date';
import { CompanyBrief } from 'src/app/models/companies/company-brief';
import { CompaniesService } from 'src/app/services/companies.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { WorksService } from 'src/app/services/works.service';
import { SelectInputComponent } from 'src/app/shared/forms/select-input/select-input.component';
import { TextAreaInputComponent } from 'src/app/shared/forms/text-area-input/text-area-input.component';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';

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
    executionPercent: [null, [Validators.max(100), Validators.min(0)]],
    executionDate: [null],
    executionStatus: ['', [Validators.required]],
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
          this.workForm.patchValue({ ...response.data as any, executionDate: formatInputDate(response.data.executionDate) });
        }
      })
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.worksService.update(this.workId, { ...this.workForm.value })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل العمل بنجاح!', 'success');
          this.router.navigate([`/projects/${this.projectId}`], { fragment: 'works' });
        }
      });
  }

}
