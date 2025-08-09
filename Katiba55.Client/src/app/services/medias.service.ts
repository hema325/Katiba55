import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';
import { Media } from '../models/medias/media';
import { MediaReferenceTypes } from '../enums/media-reference-types.enum';


@Injectable({
  providedIn: 'root'
})
export class MediasService {

  private baseUrl: string = Environment.apiUrl + 'api/medias';
  private httpClient: HttpClient = inject(HttpClient);

  create(media: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, media);
  }

  update(id: number, media: any): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${this.baseUrl}/${id}/update`, media);
  }

  delete(id: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${this.baseUrl}/${id}/delete`);
  }

  getById(id: number): Observable<Result<Media>> {
    return this.httpClient.get<Result<Media>>(`${this.baseUrl}/${id}/getById`);
  }

  getByReference(referenceId: number, referenceType: MediaReferenceTypes, showInExecutionStatusPage: boolean | null | undefined = null): Observable<Result<Media[]>> {
    let param = new HttpParams();

    param = param.append('referenceId', referenceId);
    param = param.append('referenceType', referenceType);

    if (showInExecutionStatusPage !== null && showInExecutionStatusPage !== undefined) {
      param = param.append('showInExecutionStatusPage', showInExecutionStatusPage);
    }

    return this.httpClient.get<Result<Media[]>>(`${this.baseUrl}/getByReference`, { params: param });
  }

  showInExecutionStatusPage(mediaId: number): Observable<Result<any>> {
    return this.httpClient.patch<Result<any>>(`${this.baseUrl}/${mediaId}/showInExecutionStatusPage`, null);
  }

  hideFromExecutionStatusPage(mediaId: number): Observable<Result<any>> {
    return this.httpClient.patch<Result<any>>(`${this.baseUrl}/${mediaId}/hideFromExecutionStatusPage`, null);
  }
}
