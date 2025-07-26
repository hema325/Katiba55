import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../static-data/environment';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';
import { Invoice } from '../models/invoices/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private baseUrl: string = Environment.apiUrl + 'api/invoices';
  private httpClient: HttpClient = inject(HttpClient);

  create(invoice: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, invoice);
  }

  update(id: number, invoice: any): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${this.baseUrl}/${id}/edit`, invoice);
  }

  delete(id: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${this.baseUrl}/${id}/delete`);
  }

  getById(id: number): Observable<Result<Invoice>> {
    return this.httpClient.get<Result<Invoice>>(`${this.baseUrl}/${id}/getById`);
  }

  getByContractId(contractId: number): Observable<Result<Invoice[]>> {
    return this.httpClient.get<Result<Invoice[]>>(`${this.baseUrl}/getByContractId?contractId=${contractId}`);
  }
}
