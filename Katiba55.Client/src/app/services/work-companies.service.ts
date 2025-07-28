import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/Result';
import { Observable } from 'rxjs';
import { WorkCompany } from '../models/work-companies/work-company';
import { WorkCompanyDetailed } from '../models/work-companies/work.company-detailed';

@Injectable({
  providedIn: 'root'
})
export class WorkCompaniesService {

  private baseUrl: string = Environment.apiUrl + 'api/workCompanies';
  private httpClient: HttpClient = inject(HttpClient);

  create(workCompany: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, workCompany);
  }

  update(workCompanyId: number, workCompany: any): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${this.baseUrl}/${workCompanyId}/edit`, workCompany);
  }

  delete(workCompanyId: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${this.baseUrl}/${workCompanyId}/delete`);
  }

  getById(workCompanyId: number): Observable<Result<WorkCompany>> {
    return this.httpClient.get<Result<WorkCompany>>(`${this.baseUrl}/${workCompanyId}/getById`);
  }

  getByWorkId(workId: number): Observable<Result<WorkCompanyDetailed[]>> {
    return this.httpClient.get<Result<WorkCompanyDetailed[]>>(`${this.baseUrl}/getByWorkId?workId=${workId}`);
  }
}
