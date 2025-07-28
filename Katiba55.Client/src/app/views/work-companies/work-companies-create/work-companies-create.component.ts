import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from '../../../services/companies.service';
import { WorkCompaniesService } from '../../../services/work-companies.service';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { CompanyBrief } from '../../../models/companies/company-brief';
import { fillDefaultObjectPropertiesWithNull } from '../../../helpers/object.helper';

@Component({
  selector: 'app-work-companies-create',
  templateUrl: './work-companies-create.component.html',
  styleUrls: ['./work-companies-create.component.css'],
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
export class WorkCompaniesCreateComponent implements OnInit {

  private workCompaniesService: WorkCompaniesService = inject(WorkCompaniesService);
  private companiesService: CompaniesService = inject(CompaniesService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  workCompanyForm = this.fb.group({
    companyId: ['', [Validators.required]],
    role: ['', [Validators.required]]
  });

  companies: CompanyBrief[] = [];
  workId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.workId = Number(this.activatedRoute.snapshot.queryParamMap.get('workId'));
    this.loadCompanies();
  }

  loadCompanies() {
    this.companiesService.getAll()
      .pipe(first())
      .subscribe(response => this.companies = response.data);
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.workCompaniesService.create({
      ...fillDefaultObjectPropertiesWithNull(this.workCompanyForm.value),
      workId: this.workId
    })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة الشركة للعمل بنجاح!', 'success');
          if (this.workId) {
            this.router.navigate([`/works/${this.workId}`], { fragment: 'companies' });
          } else {
            this.router.navigate(['/']);
          }
        }
      });
  }
}