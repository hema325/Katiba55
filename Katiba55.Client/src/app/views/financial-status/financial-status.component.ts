import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { CompanyBrief } from 'src/app/models/companies/company-brief';
import { ProjectWithBoq } from 'src/app/models/projects/project-with-boq';
import { BOQsService } from 'src/app/services/BOQs.service';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.css'],
  imports: [
    FormsModule,
    SpinnerComponent,
    DecimalPipe
  ]
})
export class FinancialStatusComponent implements OnInit {

  private readonly CompaniesService: CompaniesService = inject(CompaniesService);
  private readonly BOQsService: BOQsService = inject(BOQsService);

  companies: CompanyBrief[] = [];
  projects: ProjectWithBoq[] = [];
  filteredProjects: ProjectWithBoq[] = [];
  companyId: string = '';
  isLoading: boolean = false;
  searchText: string = '';

  ngOnInit() {
    this.loadCompanies();
    this.loadProjects();
  }

  private loadCompanies() {
    this.CompaniesService.getAll().subscribe(result => {
      if (result.success)
        this.companies = result.data;
    });
  }

  private loadProjects() {
    this.isLoading = true;
    this.BOQsService.getDetailedByCompanyId(Number(this.companyId))
      .pipe(
        finalize(() => this.isLoading = false),
        first()
      )
      .subscribe(result => {
        if (result.success) {
          this.projects = result.data;
          this.applyFilter();
        }
      });
  }

  onSearchChange() {
    this.applyFilter();
  }

  applyFilter() {
    const search = this.searchText?.trim();
    let filtered = this.projects;

    // فلترة حسب الشركة إذا تم اختيارها
    if (this.companyId) {
      filtered = filtered.filter(project =>
        project.boQs?.some(boq => boq.company?.id?.toString() === this.companyId)
      );
    }

    // فلترة حسب البحث (اسم المشروع أو اسم الشركة)
    if (search) {
      filtered = filtered
        .map(project => {
          // إذا كان اسم المشروع يطابق البحث، أظهر كل المقايسات
          if (project.name === search) {
            return { ...project, boQs: project.boQs };
          }
          // إذا كان اسم الشركة يطابق البحث، أظهر فقط المقايسات التابعة لهذه الشركة
          const filteredBoQs = project.boQs.filter(boq => boq.company?.name === search);
          if (filteredBoQs.length > 0) {
            return { ...project, boQs: filteredBoQs };
          }
          return null;
        })
        .filter(project => project !== null) as ProjectWithBoq[];
    }

    this.filteredProjects = filtered;
  }

  // حساب عدد الصفوف لكل مشروع للـ rowspan
  getProjectRowSpan(project: ProjectWithBoq): number {
    if (!project.boQs || project.boQs.length === 0) return 1;
    let count = 0;
    for (const boq of project.boQs) {
      if (!boq.contract || !boq.contract.invoices || boq.contract.invoices.length === 0) {
        count++;
      } else {
        count += boq.contract.invoices.length;
      }
    }
    return count;
  }

  // الإجماليات (تحتاج تعديل حسب هيكل البيانات لديك)
  get totalApprovedBoqsValue(): number {
    return this.projects.reduce((sum, project) =>
      sum + (project.boQs?.filter(boq => boq.status === 'تم الاعتماد')
        .reduce((bSum, boq) => bSum + (boq.value || 0), 0) || 0), 0
    );
  }

  get totalUnapprovedBoqsValue(): number {
    return this.projects.reduce((sum, project) =>
      sum + (project.boQs?.filter(boq => boq.status !== 'تم الاعتماد')
        .reduce((bSum, boq) => bSum + (boq.value || 0), 0) || 0), 0
    );
  }

  get totalContractedBoqsValue(): number {
    return this.projects.reduce((sum, project) =>
      sum + (project.boQs?.filter(boq => boq.contract && boq.contract.status === 'تم التعاقد')
        .reduce((bSum, boq) => bSum + (boq.contract?.value || 0), 0) || 0), 0
    );
  }

  get totalUncontractedBoqsValue(): number {
    return this.projects.reduce((sum, project) =>
      sum + (project.boQs?.filter(boq => !boq.contract || boq.contract.status !== 'تم التعاقد')
        .reduce((bSum, boq) => bSum + (boq.value || 0), 0) || 0), 0
    );
  }

  get totalPaidInvoices(): number {
    return this.projects.reduce((sum, project) =>
      sum + (project.boQs?.reduce((bSum, boq) =>
        bSum + (boq.contract?.invoices?.filter(inv => inv.status === 'تم الصرف')
          .reduce((iSum, invoice) => iSum + (invoice.value || 0), 0) || 0), 0) || 0), 0
    );
  }

  get totalUnpaidInvoices(): number {
    return this.projects.reduce((sum, project) =>
      sum + (project.boQs?.reduce((bSum, boq) =>
        bSum + (boq.contract?.invoices?.filter(inv => inv.status !== 'تم الصرف')
          .reduce((iSum, invoice) => iSum + (invoice.value || 0), 0) || 0), 0) || 0), 0
    );
  }

  get totalBoqValue(): number {
    return this.projects.reduce((sum, project) =>
      sum + (project.boQs?.reduce((bSum, boq) => bSum + (boq.value || 0), 0) || 0), 0
    );
  }

  get totalContractValue(): number {
    return this.projects.reduce((sum, project) =>
      sum + (project.boQs?.reduce((bSum, boq) => bSum + (boq.contract?.value || 0), 0) || 0), 0
    );
  }

  get totalInvoicesValue(): number {
    return this.projects.reduce((sum, project) =>
      sum + (project.boQs?.reduce((bSum, boq) =>
        bSum + (boq.contract?.invoices?.reduce((iSum, invoice) => iSum + (invoice.value || 0), 0) || 0), 0) || 0), 0
    );
  }
}