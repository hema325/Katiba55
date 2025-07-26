import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'العقود',
    },
    children: [
      {
        path: 'create',
        loadComponent: () => import('./contracts-create/contracts-create.component').then(m => m.ContractsCreateComponent),
        data: {
          title: 'إنشاء عقد'
        }
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./contracts-edit/contracts-edit.component').then(m => m.ContractsEditComponent),
        data: {
          title: 'تعديل عقد'
        }
      },
      {
        path: ':id',
        loadComponent: () => import('./contracts-detailes/contracts-detailes.component').then(m => m.ContractsDetailesComponent),
        data: {
          title: 'تفاصيل العقد'
        }
      }
    ]
  },
];