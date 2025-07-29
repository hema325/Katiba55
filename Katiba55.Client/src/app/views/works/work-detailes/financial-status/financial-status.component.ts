import { Component, inject, Input, OnInit } from '@angular/core';
import { BOQsService } from '../../../../services/BOQs.service';
import { BoqDetailed } from '../../../../models/boqs/boq-detailed';
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

  private boqsService: BOQsService = inject(BOQsService);

  @Input() workId: number = 0;

  boqs: BoqDetailed[] = [];
  filteredBoqs: BoqDetailed[] = [];
  searchText: string = '';
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.boqsService.getByDetailedWorkId(this.workId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => {
        this.boqs = response.data;
        this.filteredBoqs = response.data;
      });
  }

  get totalBoqValue(): number {
    return this.filteredBoqs?.reduce((sum, boq) => sum + (boq.value || 0), 0);
  }
  get totalContractValue(): number {
    return this.filteredBoqs?.reduce((sum, boq) => sum + (boq.contract?.value || 0), 0);
  }
  get totalInvoicesValue(): number {
    return this.filteredBoqs?.reduce((sum, boq) =>
      sum + (boq.contract?.invoices?.reduce((iSum, invoice) => iSum + (invoice.value || 0), 0) || 0), 0
    );
  }

  onSearchChange() {
    this.filteredBoqs = this.boqs.filter(boq => {
      return boq.company.name.includes(this.searchText) ||
        //boq.title.includes(this.searchText) ||
        boq.number == this.searchText ||
        boq.contract?.number == this.searchText;
    });
  }
}
