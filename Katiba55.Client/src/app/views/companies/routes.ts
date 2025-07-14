import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'الشركات',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./list-companies/list-companies.component').then(c => c.ListCompaniesComponent),
        data: {
          title: 'قائمة الشركات',
        }
      },
      {
        path: 'add',
        loadComponent: () => import('./company-add/company-add.component').then(c => c.CompanyAddComponent),
        data: {
          title: 'إضافة شركة',
        }
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./company-edit/company-edit.component').then(c => c.CompanyEditComponent),
        data: {
          title: 'تعديل الشركة',
        }
      },
      {
        path: ':id',
        loadComponent: () => import('./company-details/company-details.component').then(c => c.CompanyDetailsComponent),
        data: {
          title: 'تفاصيل الشركة',
        }
      }
    ]
  },
];