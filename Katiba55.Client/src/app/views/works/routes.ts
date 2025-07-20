import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'الأعمال',
    },
    children: [
      {
        path: 'create',
        loadComponent: () => import('./works-create/works-create.component').then(m => m.WorksCreateComponent),
        data: {
          title: 'إضافة عمل',
        }
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./works-edit/works-edit.component').then(m => m.WorksEditComponent),
        data: {
          title: 'تعديل العمل',
        }
      },
      {
        path: ':id',
        loadComponent: () => import('./work-detailes/work-detailes.component').then(m => m.WorkDetailesComponent),
        data: {
          title: 'تفاصيل العمل',
        }
      }
    ]
  },
];
