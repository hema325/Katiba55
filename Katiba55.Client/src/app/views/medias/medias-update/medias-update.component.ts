import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent } from "@coreui/angular";
import { TextInputComponent } from "../../../shared/forms/text-input/text-input.component";
import { SelectInputComponent } from "../../../shared/forms/select-input/select-input.component";
import { MediasService } from "../../../services/medias.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "../../../services/toaster.service";
import { finalize, first } from "rxjs";
import { fillDefaultObjectPropertiesWithNull } from "../../../helpers/object.helper";
import { MediaTypes } from "../../../enums/media-types.enum";
import { FileInputComponent } from "../../../shared/forms/file-input/file-input.component";
import { FilesService } from "../../../services/files.service";
import { MediaReferenceTypes } from "../../../enums/media-reference-types.enum";
import { formatInputDate } from "../../../helpers/date.helper";

@Component({
  selector: 'app-medias-update',
  templateUrl: './medias-update.component.html',
  styleUrls: ['./medias-update.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    TextInputComponent,
    FileInputComponent,
    SpinnerComponent
  ]
})
export class MediasUpdateComponent implements OnInit {

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
    file: [null]
  });

  mediaId: number = 0;
  referenceId: number = 0;
  referenceType: MediaReferenceTypes | null = null;
  mediaPath: string = '';
  mediaType = '';
  mediaSize: number = 0;
  isSubmitting: boolean = false;
  isUploadingFile: boolean = false;

  ngOnInit() {
    this.mediaId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.referenceId = Number(this.activatedRoute.snapshot.queryParamMap.get('referenceId'));
    this.referenceType = this.activatedRoute.snapshot.queryParamMap.get('referenceType') as MediaReferenceTypes;
    this.loadMedia();
  }

  loadMedia() {
    this.mediasService.getById(this.mediaId)
      .pipe(first())
      .subscribe(response => {
        if (response.success) {
          this.mediaForm.patchValue({
            ...response.data as any,
            date: formatInputDate(response.data.date)
          });
          this.mediaPath = response.data.path;
          this.mediaType = response.data.type;
          this.mediaSize = response.data.size;
        } else {
          this.toasterService.showToast('خطأ', 'فشل في تحميل البيانات!', 'danger');
        }
      });
  }

  onSubmit(): void {
    this.isSubmitting = true;
    const file = this.mediaForm.value.file;

    if (file) {
      this.isUploadingFile = true;
      this.filesService.upload(file as any)
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
    else {
      this.saveChanges();
    }

  }

  saveChanges() {
    this.mediasService.update(this.mediaId, fillDefaultObjectPropertiesWithNull(this.getCreateMediaModel()))
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
              this.router.navigate([`/items`, this.referenceId], { fragment: 'medias' });
            }
          } else {
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
      type: mediaFormValue.file ? this.determineMediaType(mediaFormValue.file as any) : this.mediaType,
      date: mediaFormValue.date,
      path: this.mediaPath,
      size: mediaFormValue.file ? (mediaFormValue.file as any).size : this.mediaSize,
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