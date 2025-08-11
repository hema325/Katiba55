import { Component, inject, Input, OnInit } from '@angular/core';
import { CompaniesService } from '../../../../services/companies.service';
import { CompanyWithBoqs } from '../../../../models/companies/company-with-boqs';
import { finalize, first } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { SpinnerComponent } from '@coreui/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.css'],
  imports: [
    DecimalPipe,
    SpinnerComponent,
    FormsModule
  ]
})
export class FinancialStatusComponent implements OnInit {

  private companiesService: CompaniesService = inject(CompaniesService);

  @Input() projectId: number = 0;

  companies: CompanyWithBoqs[] = [];
  filteredCompanies: CompanyWithBoqs[] = [];
  searchText: string = '';
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.companiesService.getDetailedWithBOQByProjectId(this.projectId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => {
        this.companies = response.data;
        this.filteredCompanies = response.data;
      });
  }

  get totalBoqValue(): number {
    return this.filteredCompanies?.reduce((sum, company) =>
      sum + (company.boQs?.reduce((bSum, boq) => bSum + (boq.value || 0), 0) || 0), 0
    );
  }

  get totalContractValue(): number {
    return this.filteredCompanies?.reduce((sum, company) =>
      sum + (company.boQs?.reduce((bSum, boq) => bSum + (boq.contract?.value || 0), 0) || 0), 0
    );
  }

  get totalInvoicesValue(): number {
    return this.filteredCompanies?.reduce((sum, company) =>
      sum + (company.boQs?.reduce((bSum, boq) => bSum + (boq.contract?.invoices?.reduce((iSum, invoice) => iSum + (invoice.value || 0), 0) || 0), 0) || 0), 0
    );
  }

  // إجمالي المقايسات التي تم اعتمادها
  get totalApprovedBoqsValue(): number {
    return this.filteredCompanies?.reduce((sum, company) =>
      sum + (company.boQs?.filter(boq => boq.status === 'تم الاعتماد')
        .reduce((bSum, boq) => bSum + (boq.value || 0), 0) || 0), 0
    );
  }

  // إجمالي المقايسات التي لم يتم اعتمادها
  get totalUnapprovedBoqsValue(): number {
    return this.filteredCompanies?.reduce((sum, company) =>
      sum + (company.boQs?.filter(boq => boq.status !== 'تم الاعتماد')
        .reduce((bSum, boq) => bSum + (boq.value || 0), 0) || 0), 0
    );
  }

  // إجمالي العقود التي تم التعاقد عليها
  get totalContractedBoqsValue(): number {
    return this.filteredCompanies?.reduce((sum, company) =>
      sum + (company.boQs?.filter(boq => boq.contract?.status === 'تم التعاقد')
        .reduce((bSum, boq) => bSum + (boq.contract?.value || 0), 0) || 0), 0
    );
  }

  // إجمالي العقود التي لم يتم التعاقد عليها
  get totalUncontractedBoqsValue(): number {
    return this.filteredCompanies?.reduce((sum, company) =>
      sum + (company.boQs?.filter(boq => !boq.contract || boq.contract?.status !== 'تم التعاقد')
        .reduce((bSum, boq) => bSum + (boq.contract?.value || 0), 0) || 0), 0
    );
  }

  // إجمالي المستخلصات التى تم صرفها
  get totalPaidInvoices(): number {
    return this.filteredCompanies?.reduce((sum, company) =>
      sum + (company.boQs?.reduce((bSum, boq) =>
        bSum + (boq.contract?.invoices?.filter(inv => inv.status === 'تم الصرف')
          .reduce((iSum, invoice) => iSum + (invoice.value || 0), 0) || 0), 0) || 0), 0
    );
  }

  // إجمالي المستخلصات التى لم يتم صرفها
  get totalUnpaidInvoices(): number {
    return this.filteredCompanies?.reduce((sum, company) =>
      sum + (company.boQs?.reduce((bSum, boq) =>
        bSum + (boq.contract?.invoices?.filter(inv => inv.status !== 'تم الصرف')
          .reduce((iSum, invoice) => iSum + (invoice.value || 0), 0) || 0), 0) || 0), 0
    );
  }

  onSearchChange() {
    if (!this.searchText) {
      this.filteredCompanies = this.companies;
      return;
    }

    this.filteredCompanies = this.companies.filter(company => {
      return company.name === this.searchText;
    });
  }

  getCompanyRowSpan(company: CompanyWithBoqs): number {
    return company.boQs.reduce((sum, b) => sum + (b.contract?.invoices?.length || 1), 0);
  }
}