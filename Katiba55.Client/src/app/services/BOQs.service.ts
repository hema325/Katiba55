import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Result } from '../models/Result';
import { Observable } from 'rxjs';
import { BOQ } from '../models/boqs/BOQ';
import { BoqDetailed } from '../models/boqs/boq-detailed';
import { ProjectWithBoq } from '../models/projects/project-with-boq';

@Injectable({
  providedIn: 'root'
})
export class BOQsService {
  private baseUrl: string = Environment.apiUrl + 'api/boqs';
  private httpClient: HttpClient = inject(HttpClient);

  create(boq: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, boq);
  }

  update(id: number, boq: any): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${this.baseUrl}/${id}/edit`, boq);
  }

  delete(id: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${this.baseUrl}/${id}/delete`);
  }

  getById(id: number): Observable<Result<BOQ>> {
    return this.httpClient.get<Result<BOQ>>(`${this.baseUrl}/${id}/getById`);
  }

  getByWorkId(workId: number): Observable<Result<BOQ[]>> {
    return this.httpClient.get<Result<BOQ[]>>(`${this.baseUrl}/getByWorkId?workId=${workId}`);
  }
  getByDetailedWorkId(workId: number): Observable<Result<BoqDetailed[]>> {
    return this.httpClient.get<Result<BoqDetailed[]>>(`${this.baseUrl}/getByDetailedWorkId?workId=${workId}`);
  }

  getDetailedByCompanyId(companyId: number | null | undefined = null): Observable<Result<ProjectWithBoq[]>> {
    let params = new HttpParams();
    if (companyId) {
      params = params.append('companyId', companyId.toString());
    }

    return this.httpClient.get<Result<ProjectWithBoq[]>>(`${this.baseUrl}/getDetailedByCompanyId`, { params });
  }
}
