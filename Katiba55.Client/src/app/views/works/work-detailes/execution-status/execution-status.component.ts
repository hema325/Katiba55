import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { finalize, first } from 'rxjs';
import { MediaReferenceTypes } from 'src/app/enums/media-reference-types.enum';
import { ItemDetailed } from 'src/app/models/items/item-detailed';
import { Media } from 'src/app/models/medias/media';
import { WorkDetailed } from 'src/app/models/works/work-detailed';
import { ExecutionStatusPipe } from 'src/app/pipes/execution-status.pipe';
import { ItemsService } from 'src/app/services/items.service';
import { MediasService } from 'src/app/services/medias.service';
import { WorksService } from 'src/app/services/works.service';
import { CircularProgressComponent } from 'src/app/shared/circular-progress/circular-progress.component';
import { Environment } from 'src/app/static-data/environment';
import { getRandomChartColorObject } from '../../../../helpers/chart-color.helper';
import { getExecutionStatusBadgeColor } from '../../../../helpers/execution-status.helper';
import { getArabicMonthName } from '../../../../helpers/date.helper';

@Component({
  selector: 'app-execution-status',
  templateUrl: './execution-status.component.html',
  styleUrls: ['./execution-status.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CircularProgressComponent,
    DatePipe,
    ExecutionStatusPipe,
    DecimalPipe,
    RouterLink,
    ChartjsComponent,
    BadgeComponent,
    SlicePipe,
    DatePipe
  ]
})
export class ExecutionStatusComponent implements OnInit {
  baseUrl = Environment.apiUrl;

  private worksService: WorksService = inject(WorksService);
  private itemsService: ItemsService = inject(ItemsService);
  private mediasService: MediasService = inject(MediasService);

  @Input() workId: number = 0;

  work: WorkDetailed | null = null;
  items: ItemDetailed[] = [];
  medias: Media[] = [];
  itemsExecutionChartData: any = null;
  workTimelineData: any = null;
  isLoadingWork: boolean = false;
  isLoadingItems: boolean = false;
  isLoadingMedias: boolean = false;
  workTimelineChartType: 'line' | 'bar' = 'line';

  ngOnInit() {
    this.loadWork();
    this.loadItems();
    this.loadMedias();
    this.loadChartTimeLineProgressData();
  }

  loadWork() {
    this.isLoadingWork = true;
    this.worksService.getDetailedById(this.workId)
      .pipe(finalize(() => this.isLoadingWork = false), first())
      .subscribe(response => this.work = response.data);
  }

  loadItems() {
    this.isLoadingItems = true;
    this.itemsService.getDetailedByWorkId(this.workId)
      .pipe(finalize(() => this.isLoadingItems = false), first())
      .subscribe(response => {
        if (response.success) {
          this.items = response.data;

          if (this.items && this.items.length > 0) {
            this.itemsExecutionChartData = {
              labels: this.items.map(item => item.name),
              datasets: [{
                label: 'نسبة التنفيذ',
                data: this.items.map(item => item.executionPercent || 0),
                ...getRandomChartColorObject()
              }]
            }
          }
        }
      });
  }

  loadMedias() {
    this.isLoadingMedias = true;
    this.mediasService.getByReference(this.workId, MediaReferenceTypes.Work, true)
      .pipe(finalize(() => this.isLoadingMedias = false), first())
      .subscribe(response => this.medias = response.data);
  }

  loadChartTimeLineProgressData() {
    this.worksService.getMonthlyTimelineProgressById(this.workId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          const items = response.data;
          let useMonthNames = items[0].year == items[items.length - 1].year;
          this.workTimelineData = {
            labels: items.map(item => useMonthNames ? getArabicMonthName(item.month) : `${item.year}-${item.month}`),
            datasets: [{
              label: 'نسبة التنفيذ',
              data: [...items.map(item => item.percentage || 0), 100],
              tension: 0.4,
              ...getRandomChartColorObject()
            }]
          };
        }
      });
  }

  setWorkTimelineChartType(type: 'bar' | 'line') {
    this.workTimelineChartType = type;
  }

  getExecutionStatusBadgeColor(status: any): string {
    return getExecutionStatusBadgeColor(status);
  }

}
