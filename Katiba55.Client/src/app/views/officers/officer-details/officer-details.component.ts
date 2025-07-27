import { Component, inject, OnInit } from '@angular/core';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, RowComponent, SpinnerComponent } from '@coreui/angular';
import { OfficersService } from '../../../services/officers.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Officer } from '../../../models/officers/officer';
import { finalize, first } from 'rxjs';
import { DatePipe } from '@angular/common';
import { OfficerRankPipe } from '../../../pipes/officer-rank.pipe';
import { OfficerStatusPipe } from '../../../pipes/officer-status.pipe';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { ToasterService } from 'src/app/services/toaster.service';

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
    RouterLink,
    SpinnerComponent,
    DeleteConfirmationModalComponent
  ]
})
export class OfficerDetailsComponent implements OnInit {

  private officersService: OfficersService = inject(OfficersService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private toasterService = inject(ToasterService);
  private router: Router = inject(Router);

  officer: Officer | null = null;
  officerId: number = 0;
  isLoading: boolean = false;
  deleteConfirmationModalVisible: boolean = false;
  isDeleting: boolean = false;

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

  fireDeleteConfirmationModal() {
    this.isDeleting = true;
    this.deleteConfirmationModalVisible = true;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.officersService
        .delete(this.officerId)
        .pipe(finalize(() => this.isDeleting = false), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف الضابط بنجاح!', 'success');
            this.router.navigate(['/officers']);
          }
        });
    }
    else {
      this.isDeleting = false
    }
  }
}
