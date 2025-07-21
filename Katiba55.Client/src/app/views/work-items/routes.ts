import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'بنود العمل',
    },
    children: [
      {
        path: 'create',
        loadComponent: () => import('./work-items-create/work-items-create.component').then(m => m.WorkItemsCreateComponent),
        data: {
          title: 'إنشاء بند عمل ',
        }
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./work-items-edit/work-items-edit.component').then(m => m.WorkItemsEditComponent),
        data: {
          title: 'تعديل بند العمل',
        }
      }
    ]
  },
];