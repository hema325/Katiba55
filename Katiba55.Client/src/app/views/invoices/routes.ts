import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'المستخلصات'
    },
    children: [
      {
        path: 'create',
        loadComponent: () => import('./invoices-create/invoices-create.component').then(m => m.InvoicesCreateComponent),
        data: {
          title: 'إنشاء مستخلص'
        }
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./invoices-edit/invoices-edit.component').then(m => m.InvoicesEditComponent),
        data: {
          title: 'تعديل مستخلص'
        }
      }
    ]
  },
];