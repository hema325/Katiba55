import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'المشاريع'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./list-projects/list-projects.component').then(c => c.ListProjectsComponent),
        data: {
          title: 'قائمة المشاريع'
        }
      },
      {
        path: 'report',
        loadComponent: () => import('./projects-report/projects-report.component').then(c => c.ProjectsReportComponent),
        data: {
          title: 'تقرير المشاريع'
        }
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./project-edit/project-edit.component').then(c => c.ProjectEditComponent),
        data: {
          title: 'تعديل المشروع'
        }
      },
      {
        path: ':id',
        loadComponent: () => import('./project-details/project-details.component').then(c => c.ProjectDetailsComponent),
        data: {
          title: 'تفاصيل المشروع'
        }
      }
    ]
  }
];
