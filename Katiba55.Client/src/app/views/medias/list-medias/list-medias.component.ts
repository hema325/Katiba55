import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent, TooltipDirective } from '@coreui/angular';
import { ToasterService } from 'src/app/services/toaster.service';
import { MediasService } from 'src/app/services/medias.service';
import { Media } from 'src/app/models/medias/media';
import { finalize, first } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MediaTypePipe } from 'src/app/pipes/media-type.pipe';
import { MediaCategoryPipe } from 'src/app/pipes/media-category.pipe';
import { FileSizePipe } from 'src/app/pipes/file-size.pipe';
import { Environment } from 'src/app/static-data/environment';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { MediaReferenceTypes } from 'src/app/enums/media-reference-types.enum';

@Component({
  selector: 'app-list-medias',
  templateUrl: './list-medias.component.html',
  styleUrls: ['./list-medias.component.css'],
  imports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    TooltipDirective,
    DatePipe,
    RouterLink,
    MediaTypePipe,
    MediaCategoryPipe,
    FileSizePipe,
    DeleteConfirmationModalComponent,
    SpinnerComponent,
  ]
})
export class ListMediasComponent implements OnInit {

  baseUrl = Environment.apiUrl;
  private mediasService: MediasService = inject(MediasService);
  private toasterService: ToasterService = inject(ToasterService);

  @Input() referenceId: number = 0;
  @Input() referenceType: MediaReferenceTypes | null = null;

  medias: Media[] = [];
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: Media | null = null;
  isLoading: boolean = false;
  isTogglingExecutionStatus: boolean = false;
  toggledMediaId: number | null = null;

  ngOnInit() {
    if (this.referenceType && this.referenceId) {
      this.isLoading = true;
      this.mediasService.getByReference(this.referenceId, this.referenceType)
        .pipe(finalize(() => this.isLoading = false), first())
        .subscribe(response => this.medias = response.data);
    }
  }

  fireDeleteConfirmationModal(media: Media) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = media;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.mediasService
        .delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف الملف بنجاح!', 'success');
            this.medias = this.medias.filter(o => o.id !== this.deletedItem!.id);
          }
        });
    }
    else {
      this.deletedItem = null
    }
  }

  toggleExecutionStatus(media: Media) {
    this.isTogglingExecutionStatus = true;
    this.toggledMediaId = media.id;

    if (!media.showInExecutionStatusPage) {
      this.mediasService.showInExecutionStatusPage(media.id)
        .pipe(finalize(() => this.isTogglingExecutionStatus = false), first())
        .subscribe(response => {
          if (response.success) {
            media.showInExecutionStatusPage = true;
            this.toasterService.showToast('نجاح', 'تم عرض الملف في الموقف التنفيذي!', 'success');
          }
        });
    }
    else {
      this.mediasService.hideFromExecutionStatusPage(media.id)
        .pipe(finalize(() => this.isTogglingExecutionStatus = false), first())
        .subscribe(response => {
          if (response.success) {
            media.showInExecutionStatusPage = false;
            this.toasterService.showToast('نجاح', 'تم إخفاء الملف من الموقف التنفيذي!', 'success');
          }
        });
    }
  }
}
