import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';
import { Company } from '../models/companies/company';
import { CompanyBrief } from '../models/companies/company-brief';
import { CompanyWithBoqs } from '../models/companies/company-with-boqs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private baseUrl: string = Environment.apiUrl + 'api/companies';
  private httpClient: HttpClient = inject(HttpClient);

  create(company: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, company);
  }

  update(companyId: number, company: any): Observable<Result<any>> {
    return this.httpClient.put<any>(`${this.baseUrl}/${companyId}/update`, company);
  }

  delete(companyId: number): Observable<Result<any>> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${companyId}/delete`);
  }

  getById(companyId: number): Observable<Result<Company>> {
    return this.httpClient.get<Result<Company>>(`${this.baseUrl}/${companyId}/getById`);
  }

  getAll(): Observable<Result<CompanyBrief[]>> {
    return this.httpClient.get<Result<CompanyBrief[]>>(`${this.baseUrl}/getAll`);
  }

  getDetailedWithBOQByWorkId(workId: number): Observable<Result<CompanyWithBoqs[]>> {
    return this.httpClient.get<Result<CompanyWithBoqs[]>>(`${this.baseUrl}/getDetailedWithBOQByWorkId?workId=${workId}`);
  }
}
