import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'البنود',
    },
    children: [
      {
        path: 'create',
        loadComponent: () => import('./items-create/items-create.component').then(m => m.ItemsCreateComponent),
        data: {
          title: 'إنشاء بند',
        }
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./items-edit/items-edit.component').then(m => m.ItemsEditComponent),
        data: {
          title: 'تعديل البند',
        }
      },
      {
        path: ':id',
        loadComponent: () => import('./item-detailes/item-detailes.component').then(m => m.ItemDetailesComponent),
        data: {
          title: 'تفاصيل البند'
        }
      }
    ]
  }
];
