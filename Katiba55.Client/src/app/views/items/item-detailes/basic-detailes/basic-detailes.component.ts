import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { finalize, first } from 'rxjs';
import { ExecutionStatus } from 'src/app/enums/execution-status.enum';
import { ItemDetailed } from 'src/app/models/items/item-detailed';
import { ItemsService } from 'src/app/services/items.service';
import { CircularProgressComponent } from 'src/app/shared/circular-progress/circular-progress.component';
import { getExecutionStatusBadgeColor } from '../../../../helpers/execution-status.helper';
import { ExecutionStatusPipe } from '../../../../pipes/execution-status.pipe';

@Component({
  selector: 'app-basic-detailes',
  templateUrl: './basic-detailes.component.html',
  styleUrls: ['./basic-detailes.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ExecutionStatusPipe,
    DatePipe,
    DecimalPipe,
    CircularProgressComponent,
    BadgeComponent
  ]
})
export class BasicDetailesComponent implements OnInit {

  private itemsService: ItemsService = inject(ItemsService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  item: ItemDetailed | null = null;
  itemId: number = 0;
  isLoading: boolean = false;

  ngOnInit() {
    this.itemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadItem();
  }

  loadItem() {
    this.isLoading = true;
    this.itemsService.getDetailedById(this.itemId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.item = response.data);
  }

  getExecutionStatusBadgeColor(status: any): string {
    return getExecutionStatusBadgeColor(status);
  }

}
