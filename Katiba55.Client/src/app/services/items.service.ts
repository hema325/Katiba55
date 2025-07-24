import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/Result';
import { Observable } from 'rxjs';
import { Item } from '../models/items/item';
import { ItemBrief } from '../models/items/item-brief';
import { ItemDetailed } from '../models/items/item-detailed';

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
    return this.httpClient.put<Result<any>>(`${this.baseUrl}/${itemId}/update`, item);
  }

  delete(workItemId: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${this.baseUrl}/${workItemId}/delete`);
  }

  getById(itemId: number): Observable<Result<Item>> {
    return this.httpClient.get<Result<Item>>(`${this.baseUrl}/${itemId}/getById`);
  }

  getDetailedById(itemId: number): Observable<Result<ItemDetailed>> {
    return this.httpClient.get<Result<ItemDetailed>>(`${this.baseUrl}/${itemId}/getDetailedById`);
  }

  getByWorkId(workId: number): Observable<Result<ItemBrief[]>> {
    return this.httpClient.get<Result<ItemBrief[]>>(`${this.baseUrl}/getByWorkId?workId=${workId}`);
  }
  getDetailedByWorkId(workId: number): Observable<Result<ItemDetailed[]>> {
    return this.httpClient.get<Result<ItemDetailed[]>>(`${this.baseUrl}/getDetailedByWorkId?workId=${workId}`);
  }

}
