import { Component, inject, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, RowComponent, SpinnerComponent } from '@coreui/angular';
import { CompaniesService } from '../../../services/companies.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Company } from '../../../models/companies/company';
import { finalize, first } from 'rxjs';
import { CompanyStatusPipe } from '../../../pipes/company-status.pipe';
import { Environment } from '../../../static-data/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css'],
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    BadgeComponent,
    ButtonDirective,
    CompanyStatusPipe,
    RouterLink,
    SpinnerComponent,
    DeleteConfirmationModalComponent
  ]
})
export class CompanyDetailsComponent implements OnInit {
  baseUrl: string = Environment.apiUrl;
  private companiesService: CompaniesService = inject(CompaniesService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private santitizer: DomSanitizer = inject(DomSanitizer);
  private toasterService = inject(ToasterService);
  private router: Router = inject(Router);
  sanitizedMapUrl: SafeResourceUrl | null = null;
  company: Company | null = null;
  companyId: number = 0;
  isLoading: boolean = false;
  deleteConfirmationModalVisible: boolean = false;
  isDeleting: boolean = false;

  getSanitizedMapUrl(latitude: any, longitude: any): SafeResourceUrl | null {
    if (latitude && longitude) {
      const mapUrl = `https://maps.google.com?q=${latitude},${longitude}&hl=ar&z=14&output=embed`;
      return this.santitizer.bypassSecurityTrustResourceUrl(mapUrl);
    }

    return null;
  }

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
          this.company = response.data;
          this.sanitizedMapUrl = this.getSanitizedMapUrl(this.company.latitude, this.company.longitude);
        }
      });
  }


  fireDeleteConfirmationModal() {
    this.isDeleting = true;
    this.deleteConfirmationModalVisible = true;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.companiesService
        .delete(this.companyId)
        .pipe(finalize(() => this.isDeleting = false), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف الشركة بنجاح!', 'success');
            this.router.navigate(['/companies']);
          }
        });
    }
    else {
      this.isDeleting = false
    }
  }
}
