import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'المقايسات',
    },
    children: [
      {
        path: 'create',
        loadComponent: () => import('./create-boq/create-boq.component').then(m => m.CreateBoqComponent),
        data: {
          title: 'إنشاء مقايسة'
        }
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./boqs-edit/boqs-edit.component').then(m => m.BoqsEditComponent),
        data: {
          title: 'تعديل المقايسة'
        }
      },
      {
        path: ':id',
        loadComponent: () => import('./boqs-detailes/boqs-detailes.component').then(m => m.BoqsDetailesComponent),
        data: {
          title: 'تفاصيل المقايسة'
        }
      }
    ]
  },
];
