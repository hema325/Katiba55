import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'الظباط'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./list-officers/list-officers.component').then(c => c.ListOfficersComponent),
        data: {
          title: 'قائمة الظباط'
        }
      },
      {
        path: 'add',
        loadComponent: () => import('./officers-add/officers-add.component').then(c => c.OfficersAddComponent),
        data: {
          title: 'اضافة'
        }
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./officers-edit/officers-edit.component').then(c => c.OfficersEditComponent),
        data: {
          title: 'تعديل'
        }
      },
      {
        path: ':id',
        loadComponent: () => import('./officer-details/officer-details.component').then(c => c.OfficerDetailsComponent),
        data: {
          title: 'التفاصيل'
        }
      },
    ]
  },
];
