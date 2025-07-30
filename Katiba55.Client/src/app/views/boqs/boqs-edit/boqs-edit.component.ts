import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { ToasterService } from 'src/app/services/toaster.service';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';
import { BOQsService } from '../../../services/BOQs.service';
import { fillDefaultObjectPropertiesWithNull } from '../../../helpers/object.helper';
import { CompaniesService } from '../../../services/companies.service';
import { CompanyBrief } from '../../../models/companies/company-brief';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';

@Component({
  selector: 'app-boqs-edit',
  templateUrl: './boqs-edit.component.html',
  styleUrls: ['./boqs-edit.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SpinnerComponent,
    SelectInputComponent
  ]
})
export class BoqsEditComponent implements OnInit {

  private boqsService: BOQsService = inject(BOQsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private companiesService: CompaniesService = inject(CompaniesService);
  private fb: FormBuilder = inject(FormBuilder);

  boqForm = this.fb.group({
    title: ['', [Validators.required]],
    number: ['', [Validators.required]],
    value: [null, [Validators.min(0)]],
    status: ['', [Validators.required]],
    companyId: ['', [Validators.required]]
  });

  companies: CompanyBrief[] = [];
  boqId: number = 0;
  workId: number = 0;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.boqId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.workId = Number(this.activatedRoute.snapshot.queryParamMap.get('workId'));
    this.loadCompanies();
    this.loadBoq();
  }

  loadCompanies() {
    this.companiesService.getAll()
      .pipe(first())
      .subscribe(response => this.companies = response.data);
  }

  loadBoq() {
    this.boqsService.getById(this.boqId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const boq = response.data;
          this.boqForm.patchValue({
            ...boq as any
          });
        }
      });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.boqsService.update(this.boqId, fillDefaultObjectPropertiesWithNull(this.boqForm.value))
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل المقايسة بنجاح!', 'success');
          if (this.workId)
            this.router.navigate(['/works', this.workId], { fragment: 'boqs' });
          else
            this.router.navigate(['/boqs']);
        }
      });
  }
}