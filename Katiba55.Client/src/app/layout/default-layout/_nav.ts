import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'الصفحة الرئيسية',
    url: '/dashboard',
    icon: 'fa-solid fa-house'
    // badge: {
    //   color: 'info',
    //   text: 'جديد'
    // }
  },
  {
    title: true,
    name: 'الصفحات'
  },
  {
    name: 'المشروعات',
    url: '/projects',
    icon: 'fa-solid fa-diagram-project'
  },
  {
    name: 'الشركات',
    url: '/companies',
    icon: 'fa-solid fa-building',
  },
  {
    name: 'الضباط',
    url: '/officers',
    icon: 'fa-solid fa-user-tie'
  },
  // {
  //   name: 'المستخدمين',
  //   url: '/users',
  //   icon: 'fa-solid fa-users'
  // },
  // {
  //   title: true,
  //   name: 'أخرى'
  // },
  // {
  //   name: 'الحساب',
  //   url: '/account',
  //   icon: 'fa-solid fa-user'
  // },
  // {
  //   name: 'تسجيل الخروج',
  //   url: '/account/logout',
  //   icon: 'fa-solid fa-right-from-bracket',
  // }
];
