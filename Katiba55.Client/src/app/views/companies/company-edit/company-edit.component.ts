import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, RowComponent, SpinnerComponent } from '@coreui/angular';
import { CompaniesService } from '../../../services/companies.service';
import { phoneValidator } from '../../../validators/phone-validator';
import { finalize, first } from 'rxjs';
import { ToasterService } from '../../../services/toaster.service';
import { FilesService } from '../../../services/files.service';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { TextAreaInputComponent } from '../../../shared/forms/text-area-input/text-area-input.component';
import { FileInputComponent } from '../../../shared/forms/file-input/file-input.component';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
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
    FileInputComponent,
    SpinnerComponent
  ]
})
export class CompanyEditComponent implements OnInit {

  private companiesService: CompaniesService = inject(CompaniesService);
  private filesService: FilesService = inject(FilesService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  companyForm = this.fb.group({
    name: ['', [Validators.required]],
    representativeName: [null],
    email: [null, [Validators.email]],
    phone: [null, [phoneValidator()]],
    status: ['', [Validators.required]],
    address: [null],
    latitude: [null],
    longitude: [null],
    securityApprovalImage: [null],
    notes: [null]
  });
  companyId: number = 0;
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  isUploadingFile: boolean = false;
  approvalImagePath: string | null | undefined = null;

  ngOnInit() {
    this.companyId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadCompany();
  }

  loadCompany() {
    this.isLoading = true;
    this.companiesService.getById(this.companyId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => {
        if (response.success) {
          const company = response.data;
          this.companyForm.patchValue({ ...response.data as any });
          this.approvalImagePath = company.approvalImagePath;
        }
      })
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.uploadFile();
  }

  uploadFile() {
    const file = this.companyForm.value.securityApprovalImage;
    if (file) {
      this.isUploadingFile = true;
      this.filesService.upload(file)
        .pipe(finalize(() => this.isUploadingFile = false), first())
        .subscribe(response => {
          if (response.success) {
            this.approvalImagePath = response.data;
            this.saveChanges();
          }
        });
    }
    else {
      this.saveChanges();
    }
  }

  saveChanges(): void {
    this.companiesService.update(this.companyId, this.getUpdateCompanyModel()).pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم تعديل الشركة بنجاح!', 'success');
          this.router.navigate(['/companies']);
        }
      })
  }

  getUpdateCompanyModel(): any {
    const company = { ...this.companyForm.value, approvalImagePath: this.approvalImagePath };
    delete company.securityApprovalImage;
    return company;
  }
}
