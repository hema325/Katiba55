import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list-projects/list-projects.component').then(c => c.ListProjectsComponent),
    data: {
      title: 'قائمة المشاريع'
    }
  },
];
