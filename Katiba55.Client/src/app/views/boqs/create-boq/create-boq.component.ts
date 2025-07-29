import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { BOQsService } from '../../../services/BOQs.service';
import { fillDefaultObjectPropertiesWithNull } from '../../../helpers/object.helper';
import { CompaniesService } from '../../../services/companies.service'
import { CompanyBrief } from '../../../models/companies/company-brief';

@Component({
  selector: 'app-create-boq',
  templateUrl: './create-boq.component.html',
  styleUrls: ['./create-boq.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    SpinnerComponent
  ]
})
export class CreateBoqComponent implements OnInit {

  private boqsService: BOQsService = inject(BOQsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);
  private companiesService: CompaniesService = inject(CompaniesService);

  boqForm = this.fb.group({
    title: ['', [Validators.required]],
    number: ['', [Validators.required]],
    value: [null, [Validators.min(0)]],
    status: ['', [Validators.required]],
    companyId: ['', [Validators.required]]
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
    this.boqsService
      .create({ ...fillDefaultObjectPropertiesWithNull(this.boqForm.value), workId: this.workId })
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة المقايسة بنجاح!', 'success');
          if (this.workId)
            this.router.navigate([`/works/${this.workId}`], { fragment: 'boqs' });
          else
            this.router.navigate(['/']);
        }
      });
  }
}