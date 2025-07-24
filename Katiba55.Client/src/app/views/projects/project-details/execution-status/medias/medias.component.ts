import { Component, inject, Input, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs';
import { MediaReferenceTypes } from 'src/app/enums/media-reference-types.enum';
import { Media } from 'src/app/models/medias/media';
import { MediasService } from 'src/app/services/medias.service';
import { Environment } from 'src/app/static-data/environment';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {
  baseUrl: string = Environment.apiUrl;
  private mediasService: MediasService = inject(MediasService);

  @Input() projectId: number = 0;

  medias: Media[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.mediasService.getByReference(this.projectId, MediaReferenceTypes.Project, true)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.medias = response.data);
  }

}
