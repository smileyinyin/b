import Main from '@/view/main'
/**
 * 个人中心
 */
export default [
  {
    path: '/personalCenter',
    name: 'personalCenter',
    meta: { title: '个人中心', icon: '_anniu_gerenzhongxin' },
    component: Main,
    children: [
      // {
      //   path: '/withdrawRecord',
      //   name: 'withdrawRecord',
      //   meta: {
      //     title: '提现记录',
      //     icon: 'ios-box'
      //   },
      //   component: () => import('@/view/personalCenter/withdrawRecord')
      // },
      // {
      //   path: '/bindingPhone',
      //   name: 'bindingPhone',
      //   meta: {
      //     title: '修改绑定手机',
      //     icon: 'ipad'
      //   },
      //   component: () => import('@/view/personalCenter/bindingPhone')
      // },
      {
        path: '/updatePassword',
        name: 'updatePassword',
        meta: {
          title: '修改密码',
          icon: 'locked'
        },
        component: () => import('@/view/personalCenter/updatePassword')
      }
      // {
      //   path: '/message',
      //   name: 'message',
      //   meta: {
      //     title: '消息通知',
      //     icon: 'ios-box'
      //   },
      //   component: () => import('@/view/personalCenter/message')
      // },
    ]
  }
]
