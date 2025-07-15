import { inject, Injectable } from '@angular/core';
import { Environment } from '../static-data/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/Result';
import { Project } from '../models/projects/project';
import { ProjectBrief } from '../models/projects/project-brief';
import { ProjectDetailed } from '../models/projects/project-detailed';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private baseUrl: string = Environment.apiUrl + 'api/projects';
  private httpClient: HttpClient = inject(HttpClient);


  create(project: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.baseUrl}/create`, project);
  }

  update(projectId: number, project: any): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${this.baseUrl}/${projectId}/update`, project);
  }

  delete(projectId: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${this.baseUrl}/${projectId}/delete`);
  }

  getById(projectId: number): Observable<Result<Project>> {
    return this.httpClient.get<Result<Project>>(`${this.baseUrl}/${projectId}/getById`)
  }

  getBriefById(projectId: number): Observable<Result<ProjectBrief>> {
    return this.httpClient.get<Result<ProjectBrief>>(`${this.baseUrl}/${projectId}/getBriefById`)
  }

  getDetailedById(projectId: number): Observable<Result<ProjectDetailed>> {
    return this.httpClient.get<Result<ProjectDetailed>>(`${this.baseUrl}/${projectId}/getDetailedById`)
  }

  getAll(): Observable<Result<ProjectBrief[]>> {
    return this.httpClient.get<Result<ProjectBrief[]>>(`${this.baseUrl}/getAll`);
  }
}
