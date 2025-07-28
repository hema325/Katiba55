import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'قائمة  شركات الاعمال',
    },
    children: [
      {
        path: 'create',
        data: { title: 'إضافة شركة للعمل' },
        loadComponent: () => import('./work-companies-create/work-companies-create.component').then(m => m.WorkCompaniesCreateComponent)
      },
      {
        path: ':id/edit',
        data: { title: 'تعديل شركة العمل' },
        loadComponent: () => import('./work-companies-update/work-companies-update.component').then(m => m.WorkCompaniesUpdateComponent)
      }
    ]
  },
];