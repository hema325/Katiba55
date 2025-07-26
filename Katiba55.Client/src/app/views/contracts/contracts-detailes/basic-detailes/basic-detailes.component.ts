import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { first } from 'rxjs';
import { ExecutionStatusPipe } from 'src/app/pipes/execution-status.pipe';
import { CircularProgressComponent } from 'src/app/shared/circular-progress/circular-progress.component';
import { ContractsService } from 'src/app/services/contracts.service';
import { Contract } from 'src/app/models/contracts/contract';

@Component({
  selector: 'app-basic-detailes',
  templateUrl: './basic-detailes.component.html',
  styleUrls: ['./basic-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CircularProgressComponent,
    DatePipe,
    ExecutionStatusPipe,
    RouterLink,
    DecimalPipe
  ]
})
export class BasicDetailesComponent implements OnInit {

  private contractsService: ContractsService = inject(ContractsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  contract: Contract | null = null;
  id: number = 0;


  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.loadContract();
  }

  loadContract() {
    this.contractsService.getById(this.id)
      .pipe(first())
      .subscribe(response => this.contract = response.data);
  }

}