import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { Officer } from '../models/officers/officer';
import { OfficerBrief } from '../models/officers/officer-brief';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';

@Injectable({
  providedIn: 'root'
})
export class OfficersService {

  private baseUrl: string = Environment.apiUrl + 'api/officers';
  private httpClient: HttpClient = inject(HttpClient);

  create(officer: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, officer);
  }

  update(officerId: number, officer: any): Observable<Result<any>> {
    return this.httpClient.put<any>(`${this.baseUrl}/${officerId}/update`, officer);
  }

  delete(officerId: number): Observable<Result<any>> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${officerId}/delete`);
  }

  getById(officerId: number): Observable<Result<Officer>> {
    return this.httpClient.get<Result<Officer>>(`${this.baseUrl}/${officerId}/getById`);
  }

  getAll(): Observable<Result<OfficerBrief[]>> {
    return this.httpClient.get<Result<OfficerBrief[]>>(`${this.baseUrl}/getAll`);
  }
}
