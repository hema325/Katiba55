import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { CompanyBrief } from 'src/app/models/companies/company-brief';
import { CompaniesService } from 'src/app/services/companies.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { WorkCompaniesService } from 'src/app/services/work-companies.service';
import { SelectInputComponent } from 'src/app/shared/forms/select-input/select-input.component';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';
import { fillDefaultObjectPropertiesWithNull } from '../../../helpers/object.helper';

@Component({
  selector: 'app-work-companies-update',
  templateUrl: './work-companies-update.component.html',
  styleUrls: ['./work-companies-update.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    SpinnerComponent
  ],
  standalone: true
})
export class WorkCompaniesUpdateComponent implements OnInit {

  private workCompaniesService: WorkCompaniesService = inject(WorkCompaniesService);
  private companiesService: CompaniesService = inject(CompaniesService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  workCompanyForm = this.fb.group({
    role: ['', [Validators.required]]
  });

  companies: CompanyBrief[] = [];
  workCompanyId: number = 0;
  workId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.workCompanyId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.workId = Number(this.activatedRoute.snapshot.queryParamMap.get('workId'));
    this.loadCompanies();
    this.loadWorkCompany();
  }

  loadCompanies() {
    this.companiesService.getAll()
      .pipe(first())
      .subscribe(response => this.companies = response.data);
  }

  loadWorkCompany() {
    this.workCompaniesService.getById(this.workCompanyId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const workCompany = response.data;
          this.workCompanyForm.patchValue({
            role: workCompany.role
          });
        }
      });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.workCompaniesService.update(this.workCompanyId, {
      ...fillDefaultObjectPropertiesWithNull(this.workCompanyForm.value),
      workId: this.workId
    })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل الشركة بنجاح!', 'success');
          if (this.workId)
            this.router.navigate([`/works/${this.workId}`], { fragment: 'companies' });
          else
            this.router.navigate(['/']);
        }
      });
  }
}