import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./layout').then(m => m.DefaultLayoutComponent),
    data: {
      title: 'الصفحة الرئيسيه'
    },
    title: 'الكتيبة 55 انشاءات',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'projects',
        loadChildren: () => import('./views/projects/routes').then((m) => m.routes)
      },
      {
        path: 'officers',
        loadChildren: () => import('./views/officers/routes').then((m) => m.routes)
      },
      {
        path: 'companies',
        loadChildren: () => import('./views/companies/routes').then((m) => m.routes)
      },
      {
        path: 'works',
        loadChildren: () => import('./views/works/routes').then((m) => m.routes)
      },
      {
        path: 'items',
        loadChildren: () => import('./views/items/routes').then((m) => m.routes)
      },
      {
        path: 'medias',
        loadChildren: () => import('./views/medias/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      },
      {
        path: 'boqs',
        loadChildren: () => import('./views/boqs/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
  //   data: {
  //     title: 'تسجيل الدخول'
  //   }
  // },
  { path: '**', redirectTo: '/404' }
];
