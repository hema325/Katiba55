import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';
import { Item } from '../models/items/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private baseUrl: string = Environment.apiUrl + 'api/items';
  private httpClient: HttpClient = inject(HttpClient);

  create(item: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, item);
  }

  update(itemId: number, item: any): Observable<Result<any>> {
    return this.httpClient.put<any>(`${this.baseUrl}/${itemId}/update`, item);
  }

  delete(itemId: number): Observable<Result<any>> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${itemId}/delete`);
  }

  getById(itemId: number): Observable<Result<Item>> {
    return this.httpClient.get<Result<Item>>(`${this.baseUrl}/${itemId}/getById`);
  }

  getByProjectId(projectId: number): Observable<Result<Item[]>> {
    return this.httpClient.get<Result<Item[]>>(`${this.baseUrl}/getByProjectId?projectId=${projectId}`);
  }
  getByWorkId(workId: number): Observable<Result<Item[]>> {
    return this.httpClient.get<Result<Item[]>>(`${this.baseUrl}/getByWorkId?workId=${workId}`);
  }
}
