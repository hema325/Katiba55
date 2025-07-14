import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ToasterService } from '../../../services/toaster.service';
import { RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, PageItemComponent, ProgressComponent, RowComponent, SpinnerComponent, TableDirective, TooltipDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { OfficersService } from '../../../services/officers.service';
import { OfficerBrief } from '../../../models/officers/officer-brief';
import { finalize, first } from 'rxjs';
import { OfficerRankPipe } from '../../../pipes/officer-rank.pipe';
import { OfficerStatusPipe } from '../../../pipes/officer-status.pipe';
import { OfficerStatus } from '../../../enums/officer-status.enum';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';

@Component({
  selector: 'app-list-officers',
  templateUrl: './list-officers.component.html',
  styleUrls: ['./list-officers.component.css'],
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    ButtonDirective,
    IconDirective,
    BadgeComponent,
    DeleteConfirmationModalComponent,
    RouterLink,
    SpinnerComponent,
    OfficerRankPipe,
    OfficerStatusPipe,
    SpinnerComponent,
    LoaderComponent,
    TooltipDirective,
  ]
})
export class ListOfficersComponent implements OnInit {

  private officersService: OfficersService = inject(OfficersService);
  private toasterService: ToasterService = inject(ToasterService);

  officers: OfficerBrief[] = [];
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: OfficerBrief | null = null;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.officersService.getAll()
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.officers = response.data);
  }

  fireDeleteConfirmationModal(officer: OfficerBrief) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = officer;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.officersService
        .delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف الضابط بنجاح!', 'success');
            this.officers = this.officers.filter(o => o.id !== this.deletedItem!.id);
          }
        });
    }
    else {
      this.deletedItem = null
    }
  }

  getStatusBadgeColor(status: string): string {
    switch (status) {
      case OfficerStatus.InBattalion:
        return 'success';
      case OfficerStatus.OutBattalion:
        return 'danger';
      default:
        return 'info';
    }
  }
}
