import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompaniesService } from '../../../services/companies.service';
import { phoneValidator } from '../../../validators/phone-validator';
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { FilesService } from '../../../services/files.service';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { TextInputComponent } from '../../../shared/forms/text-input/text-input.component';
import { SelectInputComponent } from '../../../shared/forms/select-input/select-input.component';
import { TextAreaInputComponent } from '../../../shared/forms/text-area-input/text-area-input.component';
import { FileInputComponent } from '../../../shared/forms/file-input/file-input.component';
import { finalize, first } from 'rxjs';
import { CompanyStatus } from '../../../enums/company-status.enum';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    TextAreaInputComponent,
    FileInputComponent,
    SpinnerComponent
  ]
})
export class CompanyAddComponent implements OnInit {

  private companiesService: CompaniesService = inject(CompaniesService);
  private filesService: FilesService = inject(FilesService);
  private router: Router = inject(Router);
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
    securityApprovalImage: [{ value: null, disabled: true }],
    notes: [null]
  });
  isSubmitting: boolean = false;
  isUploadingFile: boolean = false;
  approvalImagePath: string | null = null;

  constructor() { }

  ngOnInit() {
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
    this.companiesService.create(this.getCreateCompanyModel()).pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة الشركة بنجاح!', 'success');
          this.router.navigate(['/companies']);
        }
      })
  }

  getCreateCompanyModel(): any {
    const company = { ...this.companyForm.value, approvalImagePath: this.approvalImagePath };
    delete company.securityApprovalImage;
    return company;
  }

  onStatusChange(status: any) {
    const securityApprovalImageControl = this.companyForm.get('securityApprovalImage');
    if (status === CompanyStatus.Approved) {
      securityApprovalImageControl?.setValidators([Validators.required]);
      securityApprovalImageControl?.enable();
    }
    else {
      securityApprovalImageControl?.setValidators(null);
      securityApprovalImageControl?.disable();
      securityApprovalImageControl?.setValue(null);
      this.approvalImagePath = null;
    }

    securityApprovalImageControl?.updateValueAndValidity();
  }
}
