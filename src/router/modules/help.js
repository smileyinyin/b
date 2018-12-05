import Main from '@/view/main'
/**
 * 帮助页
 */
export default [
  {
    path: '/help',
    redirect: '/help/index',
    meta: { hideInMenu: true },
    component: Main,
    children: [
      {
        path: 'index',
        name: 'help',
        component: () => import('@/view/help/index.vue')
      }
    ]
  }
]
