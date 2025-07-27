import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { MediasService } from 'src/app/services/medias.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { MediaTypes } from 'src/app/enums/media-types.enum';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from '@coreui/angular';
import { SelectInputComponent } from 'src/app/shared/forms/select-input/select-input.component';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';
import { FileInputComponent } from 'src/app/shared/forms/file-input/file-input.component';
import { FilesService } from 'src/app/services/files.service';
import { MediaReferenceTypes } from 'src/app/enums/media-reference-types.enum';

@Component({
  selector: 'app-medias-create',
  templateUrl: './medias-create.component.html',
  styleUrls: ['./medias-create.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    FileInputComponent,
    SpinnerComponent
  ]
})
export class MediasCreateComponent implements OnInit {

  private mediasService: MediasService = inject(MediasService);
  private filesService: FilesService = inject(FilesService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toasterService: ToasterService = inject(ToasterService);
  private fb: FormBuilder = inject(FormBuilder);

  mediaForm = this.fb.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    date: ['', [Validators.required]],
    file: [null, [Validators.required]]
  });

  referenceId: number = 0;
  referenceType: MediaReferenceTypes | null = null;
  mediaPath: string = '';
  isSubmitting: boolean = false;
  isUploadingFile: boolean = false;

  ngOnInit() {
    this.referenceId = Number(this.activatedRoute.snapshot.queryParamMap.get('referenceId'));
    this.referenceType = this.activatedRoute.snapshot.queryParamMap.get('referenceType') as MediaReferenceTypes;
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.isUploadingFile = true;
    this.filesService.upload(this.mediaForm.value.file as any)
      .pipe(finalize(() => this.isUploadingFile = false), first())
      .subscribe(response => {
        if (response.success) {
          this.mediaPath = response.data;
          this.saveChanges();
        } else {
          this.toasterService.showToast('خطأ', 'فشل رفع الملف!', 'danger');
          this.isSubmitting = false;
        }
      });

  }

  saveChanges() {
    this.mediasService.create(this.getCreateMediaModel())
      .pipe(finalize(() => this.isSubmitting = false), first())
      .subscribe(response => {
        if (response.success) {
          this.toasterService.showToast('نجاح', 'تم إضافة الملف بنجاح!', 'success');

          if (this.referenceId && this.referenceType) {
            if (this.referenceType === MediaReferenceTypes.Project) {
              this.router.navigate([`/projects`, this.referenceId], { fragment: 'medias' });
            } else if (this.referenceType === MediaReferenceTypes.Work) {
              this.router.navigate([`/works`, this.referenceId], { fragment: 'medias' });
            } else if (this.referenceType === MediaReferenceTypes.Item) {
              this.router.navigate([`/items`, this.referenceId], { fragment: 'medias  ' });
            }
          }
          else {
            this.router.navigate(['/']);
          }

        }
      });
  }

  getCreateMediaModel() {
    const mediaFormValue = this.mediaForm.value;
    return {
      name: mediaFormValue.name,
      category: mediaFormValue.category,
      type: this.determineMediaType(mediaFormValue.file as any),
      referenceId: this.referenceId,
      referenceType: this.referenceType,
      date: mediaFormValue.date,
      path: this.mediaPath,
      size: (mediaFormValue.file as any).size,
    }
  }

  determineMediaType(file: File): MediaTypes | undefined {
    const mimeType = file.type;

    if (mimeType.startsWith("image/")) return MediaTypes.Image;
    if (mimeType.startsWith("video/")) return MediaTypes.Video;

    if (mimeType === "application/pdf") return MediaTypes.Pdf;

    if (
      mimeType === "application/msword" ||
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) return MediaTypes.Word;

    if (
      mimeType === "application/vnd.ms-excel" ||
      mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) return MediaTypes.Excel;

    if (
      mimeType === "application/vnd.ms-powerpoint" ||
      mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) return MediaTypes.PowerPoint;

    return undefined;
  }
}
