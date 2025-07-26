import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/Result';
import { Observable } from 'rxjs';
import { Contract } from '../models/contracts/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  private baseUrl: string = Environment.apiUrl + 'api/contracts';
  private httpClient: HttpClient = inject(HttpClient);

  create(contract: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, contract);
  }

  update(id: number, contract: any): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${this.baseUrl}/${id}/edit`, contract);
  }

  delete(id: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${this.baseUrl}/${id}/delete`);
  }

  getById(id: number): Observable<Result<Contract>> {
    return this.httpClient.get<Result<Contract>>(`${this.baseUrl}/${id}/getById`);
  }

  getByBOQId(boqId: number): Observable<Result<Contract>> {
    return this.httpClient.get<Result<Contract>>(`${this.baseUrl}/getByBOQId?boqId=${boqId}`);
  }
}
