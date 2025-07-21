import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/Result';
import { Observable } from 'rxjs';
import { WorkItem } from '../models/work-items/work-item';
import { WorkItemDetailed } from '../models/work-items/work-item-detailed';

@Injectable({
  providedIn: 'root'
})
export class WorkItemsService {

  private baseUrl: string = Environment.apiUrl + 'api/workItems';
  private httpClient: HttpClient = inject(HttpClient);

  create(workItem: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, workItem);
  }

  update(workItemId: number, workItem: any): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${this.baseUrl}/${workItemId}/update`, workItem);
  }

  delete(workItemId: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${this.baseUrl}/${workItemId}/delete`);
  }

  getById(workId: number): Observable<Result<WorkItem>> {
    return this.httpClient.get<Result<WorkItem>>(`${this.baseUrl}/${workId}/getById`);
  }

  getByWorkId(workId: number): Observable<Result<WorkItemDetailed[]>> {
    return this.httpClient.get<Result<WorkItemDetailed[]>>(`${this.baseUrl}/getByWorkId?workId=${workId}`);
  }

}
