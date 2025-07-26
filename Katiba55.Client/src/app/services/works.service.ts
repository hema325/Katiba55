import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';
import { Work } from '../models/works/work';
import { WorkBrief } from '../models/works/work-brief';
import { WorkDetailed } from '../models/works/work-detailed';
import { WorkDetailedWithItems } from '../models/works/work-detailed-with-items';
import { WorkMonthlyProgressItem } from '../models/works/work-monthly-progress-item';
import { WorkMonthlyProgressList } from '../models/works/work-monthly-progress-list';
import { WorkExecutionSummary } from '../models/works/work-execution-summary';
import { WorkWithDetailedBoq } from '../models/works/work-with-detailed-boq';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  private baseUrl: string = Environment.apiUrl + 'api/works';
  private httpClient: HttpClient = inject(HttpClient);

  create(work: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, work);
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

  getBriefByProjectId(projectId: number): Observable<Result<WorkBrief[]>> {
    return this.httpClient.get<Result<WorkBrief[]>>(`${this.baseUrl}/getBriefByProjectId?projectId=${projectId}`);
  }

  getDetailedByProjectId(projectId: number): Observable<Result<WorkDetailed[]>> {
    return this.httpClient.get<Result<WorkDetailed[]>>(`${this.baseUrl}/getDetailedByProjectId?projectId=${projectId}`);
  }
  getDetailedWithBOQByProjectId(projectId: number): Observable<Result<WorkWithDetailedBoq[]>> {
    return this.httpClient.get<Result<WorkWithDetailedBoq[]>>(`${this.baseUrl}/getDetailedWithBOQByProjectId?projectId=${projectId}`);
  }

  getWorksExecutionSummaryByProjectId(projectId: number): Observable<Result<WorkExecutionSummary>> {
    return this.httpClient.get<Result<WorkExecutionSummary>>(`${this.baseUrl}/getWorksExecutionSummaryByProjectId?projectId=${projectId}`);
  }

  getMonthlyTimelineProgressById(workId: number): Observable<Result<WorkMonthlyProgressItem[]>> {
    return this.httpClient.get<Result<WorkMonthlyProgressItem[]>>(`${this.baseUrl}/${workId}/getMonthlyTimelineProgress`);
  }

  getMonthlyTimelineProgressByProjectId(projectId: number): Observable<Result<WorkMonthlyProgressList[]>> {
    return this.httpClient.get<Result<WorkMonthlyProgressList[]>>(`${this.baseUrl}/getMonthlyTimelineProgressByProjectId?projectId=${projectId}`);
  }
}

