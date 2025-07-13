import { Component, inject, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { OfficersService } from '../../../services/officers.service';
import { ActivatedRoute } from '@angular/router';
import { Officer } from '../../../models/officers/officer';
import { finalize, first } from 'rxjs';
import { DatePipe } from '@angular/common';
import { OfficerRankPipe } from '../../../pipes/officer-rank.pipe';
import { OfficerStatusPipe } from '../../../pipes/officer-status.pipe';

@Component({
  selector: 'app-officer-details',
  templateUrl: './officer-details.component.html',
  styleUrls: ['./officer-details.component.css'],
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    BadgeComponent,
    ButtonDirective,
    DatePipe,
    OfficerRankPipe,
    OfficerStatusPipe,
  ]
})
export class OfficerDetailsComponent implements OnInit {

  private officersService: OfficersService = inject(OfficersService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  officer: Officer | null = null;
  officerId: number = 0;
  isLoading: boolean = false;


  ngOnInit() {
    this.officerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadOfficer();
  }

  loadOfficer() {
    this.isLoading = true;
    this.officersService.getById(this.officerId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => {
        if (response.success) {
          this.officer = response.data;
        }
      });
  }
}
