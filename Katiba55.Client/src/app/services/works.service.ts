import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';
import { Work } from '../models/works/work';
import { WorkBrief } from '../models/works/work-brief';
import { WorkDetailed } from '../models/works/work-detailed';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  private baseUrl: string = Environment.apiUrl + 'api/works';
  private httpClient: HttpClient = inject(HttpClient);

  create(work: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(this.baseUrl, work);
  }

  update(workId: number, work: any): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${this.baseUrl}/${workId}/update`, work);
  }

  delete(workId: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${this.baseUrl}/${workId}/delete`);
  }

  getById(workId: number): Observable<Result<Work>> {
    return this.httpClient.get<Result<Work>>(`${this.baseUrl}/${workId}/getById`);
  }

  getDetailedById(workId: number): Observable<Result<WorkDetailed>> {
    return this.httpClient.get<Result<WorkDetailed>>(`${this.baseUrl}/${workId}/getDetailedById`);
  }

  getByProjectId(projectId: number): Observable<Result<WorkBrief[]>> {
    return this.httpClient.get<Result<WorkBrief[]>>(`${this.baseUrl}/getByProjectId?projectId=${projectId}`);
  }
}
