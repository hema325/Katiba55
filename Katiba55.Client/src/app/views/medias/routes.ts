import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'الوسائط'
    },
    children: [
      {
        path: 'create',
        loadComponent: () => import('./medias-create/medias-create.component').then(m => m.MediasCreateComponent),
        data: {
          title: 'إضافة ميديا',
        }
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./medias-update/medias-update.component').then(m => m.MediasUpdateComponent),
        data: {
          title: 'تعديل ميديا',
        }
      }
    ]
  },
];