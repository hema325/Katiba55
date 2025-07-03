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
        path: ':id',
        loadComponent: () => import('./project-details/project-details.component').then(c => c.ProjectDetailsComponent),
        data: {
          title: 'تفاصيل المشروع'
        }
      }
    ]
  }
];
