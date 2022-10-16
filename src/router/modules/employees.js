import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [{
    name: 'employees',
    path: '',
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  },
  {
    path: '/employees/detial/:id',
    component: () => import('@/views/employees/detail.vue'),
    hidden: true
  },
  {
    path: 'print/:id',
    component: () => import('@/views/employees/print.vue'),
    hidden: true
  }
  ]
}
