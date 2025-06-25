import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'لوحة الادارة',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'جديد'
    }
  },
  {
    title: true,
    name: 'الصفحات'
  },
  {
    name: 'الشركات',
    url: '/companies',
    iconComponent: { name: 'cilHome' },
    children: [
      {
        name: 'عرض قائمة الشركات',
        url: '/companies/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'اضافة شركة جديده',
        url: '/companies/add',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'الضباط',
    url: '/officers',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'عرض قائمة الضباط',
        url: '/officers/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'اضافة ضابط جديد',
        url: '/companies/add',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'المشروعات',
    url: '/projects',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'عرض قائمة المشروعات',
        url: '/projects/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'اضافة مشروع جديد',
        url: '/projects/add',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'المستخدمين',
    url: '/users',
    iconComponent: { name: 'cilPeople' },
    children: [
      {
        name: 'عرض قائمة المستخدمين',
        url: '/projects/list',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'اضافة مستخدم جديد',
        url: '/projects/add',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'أخرى'
  },
  {
    name: 'الحساب',
    url: '/projects',
    iconComponent: { name: 'cilUser' },
    children: [
      {
        name: 'تحديث البيانات',
        url: '/account/update',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'تغير كلمة السر',
        url: '/account/update',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'تسجيل الخروج',
    url: '/account/logout',
    iconComponent: { name: 'cilAccountLogout' }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Base',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Accordion',
        url: '/base/accordion',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Carousel',
        url: '/base/carousel',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Collapse',
        url: '/base/collapse',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'List Group',
        url: '/base/list-group',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Navs & Tabs',
        url: '/base/navs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Pagination',
        url: '/base/pagination',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Placeholder',
        url: '/base/placeholder',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Spinners',
        url: '/base/spinners',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Button groups',
        url: '/buttons/button-groups',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Forms',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Form Control',
        url: '/forms/form-control',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Select',
        url: '/forms/select',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Checks & Radios',
        url: '/forms/checks-radios',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Range',
        url: '/forms/range',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Input Group',
        url: '/forms/input-group',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Floating Labels',
        url: '/forms/floating-labels',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Layout',
        url: '/forms/layout',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Validation',
        url: '/forms/validation',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Charts',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/charts'
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Modal',
        url: '/notifications/modal',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Toast',
        url: '/notifications/toasts',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto'
  },
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' }
  }
];
