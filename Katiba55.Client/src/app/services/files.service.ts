import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private baseUrl: string = Environment.apiUrl + 'api/files';
  private httpClient: HttpClient = inject(HttpClient);


  upload(file: File): Observable<Result<string>> {
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<Result<string>>(`${this.baseUrl}/upload`, formData);
  }

}
