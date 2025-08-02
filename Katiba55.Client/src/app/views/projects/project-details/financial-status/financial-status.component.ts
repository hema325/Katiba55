import { Component, inject, Input, OnInit } from '@angular/core';
import { WorksService } from '../../../../services/works.service';
import { WorkWithDetailedBoq } from '../../../../models/works/work-with-detailed-boq';
import { finalize, first } from 'rxjs';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { SpinnerComponent } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.css'],
  imports: [
    DecimalPipe,
    SpinnerComponent,
    FormsModule,
    NgxPrintModule
  ]
})
export class FinancialStatusComponent implements OnInit {

  private worksService: WorksService = inject(WorksService);
  @Input() projectId: number = 0;

  works: WorkWithDetailedBoq[] = [];
  filteredWorks: WorkWithDetailedBoq[] = [];
  searchText: string = '';
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.worksService.getDetailedWithBOQByProjectId(this.projectId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => {
        this.works = response.data;
        this.filteredWorks = this.works;
      });
  }

  getWorkRowSpan(work: any): number {
    let count = 0;
    for (const boq of work.boQs) {
      count += (boq.contract?.invoices?.length || 1);
    }
    return count;
  }

  get totalBoqValue(): number {
    return this.filteredWorks?.reduce((sum, work) =>
      sum + (work.boQs?.reduce((bSum, boq) => bSum + (boq.value || 0), 0) || 0), 0
    );
  }

  get totalContractValue(): number {
    return this.filteredWorks?.reduce((sum, work) =>
      sum + (work.boQs?.reduce((bSum, boq) => bSum + (boq.contract?.value || 0), 0) || 0), 0
    );
  }

  get totalInvoicesValue(): number {
    return this.filteredWorks?.reduce((sum, work) =>
      sum + (work.boQs?.reduce((bSum, boq) =>
        bSum + (boq.contract?.invoices?.reduce((iSum, invoice) => iSum + (invoice.value || 0), 0) || 0), 0) || 0), 0
    );
  }

  get totalPaidInvoices(): number {
    return this.filteredWorks?.reduce((sum, work) =>
      sum + (work.boQs?.reduce((bSum, boq) =>
        bSum + (boq.contract?.invoices?.filter(inv => inv.status === 'تم الصرف')
          .reduce((iSum, invoice) => iSum + (invoice.value || 0), 0) || 0), 0) || 0), 0
    );
  }

  get totalUnpaidInvoices(): number {
    return this.filteredWorks?.reduce((sum, work) =>
      sum + (work.boQs?.reduce((bSum, boq) =>
        bSum + (boq.contract?.invoices?.filter(inv => inv.status !== 'تم الصرف')
          .reduce((iSum, invoice) => iSum + (invoice.value || 0), 0) || 0), 0) || 0), 0
    );
  }

  get totalContractedBoqsValue(): number {
    return this.filteredWorks?.reduce((sum, work) =>
      sum + (work.boQs?.filter(boq => boq.contract?.status === 'تم التعاقد')
        .reduce((bSum, boq) => bSum + (boq.contract?.value || 0), 0) || 0), 0
    );
  }

  get totalUncontractedBoqsValue(): number {
    return this.filteredWorks?.reduce((sum, work) =>
      sum + (work.boQs?.filter(boq => !boq.contract || boq.contract?.status !== 'تم التعاقد')
        .reduce((bSum, boq) => bSum + (boq.contract?.value || 0), 0) || 0), 0
    );
  }

  get totalApprovedBoqsValue(): number {
    return this.filteredWorks?.reduce((sum, work) =>
      sum + (work.boQs?.filter(boq => boq.status === 'تم الاعتماد')
        .reduce((bSum, boq) => bSum + (boq.value || 0), 0) || 0), 0
    );
  }

  get totalUnapprovedBoqsValue(): number {
    return this.filteredWorks?.reduce((sum, work) =>
      sum + (work.boQs?.filter(boq => boq.status !== 'تم الاعتماد')
        .reduce((bSum, boq) => bSum + (boq.value || 0), 0) || 0), 0
    );
  }

  onSearchChange() {

    if (!this.searchText) {
      this.filteredWorks = this.works;
      return;
    }

    this.filteredWorks = this.works
      .map(work => {
        if (work.name == this.searchText) {
          return { ...work, boQs: work.boQs };
        }
        const filteredBoQs = work.boQs.filter(boq => boq.company?.name == this.searchText);
        if (filteredBoQs.length > 0) {
          return { ...work, boQs: filteredBoQs };
        }
        return null;
      })
      .filter(work => work !== null) as WorkWithDetailedBoq[];
  }
}
