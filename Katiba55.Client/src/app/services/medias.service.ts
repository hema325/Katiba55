import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';
import { Media } from '../models/medias/media';

@Injectable({
  providedIn: 'root'
})
export class MediasService {

  private baseUrl: string = Environment.apiUrl + 'api/medias';
  private httpClient: HttpClient = inject(HttpClient);

  create(media: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, media);
  }

  delete(id: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${this.baseUrl}/${id}/delete`);
  }

  getByProjectId(projectId: number, showInExecutionStatusPage: boolean | null | undefined = null): Observable<Result<Media[]>> {
    let param = new HttpParams();

    if (showInExecutionStatusPage !== null && showInExecutionStatusPage !== undefined) {
      param = param.append('showInExecutionStatusPage', showInExecutionStatusPage);
    }

    param = param.append('projectId', projectId);

    return this.httpClient.get<Result<Media[]>>(`${this.baseUrl}/getByProjectId`, { params: param });
  }

  showInExecutionStatusPage(mediaId: number): Observable<Result<any>> {
    return this.httpClient.patch<Result<any>>(`${this.baseUrl}/${mediaId}/showInExecutionStatusPage`, null);
  }

  hideFromExecutionStatusPage(mediaId: number): Observable<Result<any>> {
    return this.httpClient.patch<Result<any>>(`${this.baseUrl}/${mediaId}/hideFromExecutionStatusPage`, null);
  }
}
