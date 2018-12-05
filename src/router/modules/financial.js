import Main from '@/view/main'

/**
 * 财务管理
 */
export default [
  {
    path: '/withdrawCashMenu',
    name: 'withdrawCashMenu',
    meta: {
      title: '财务管理',
      icon: '_bokuanmingxi'
      // access: ['SXR001','SXR002']
    },
    component: Main,
    children: [
      {
        path: '/withdrawCash',
        name: 'withdrawCash',
        meta: {
          title: '我的结算',
          icon: '_dingdan',
          access: ['SXR001', 'SXR002']
        },
        component: () => import('@/view/withdrawCash/index')
      },
      {
        path: '/tixian-record',
        name: 'tixian-record',
        meta: {
          title: '月度账单',
          icon: '_dingdan',
          access: ['SXR003']
        },
        component: () => import('@/view/withdrawCash/tixian-record')
      },
      // {
      //   path: '/tixian-apply',
      //   name: 'tixian-apply',
      //   meta: {
      //     title:'业务员结算',
      //     icon: '_dingdan',
      //     access: ['SXR001']
      //   },
      //   component: () => import('@/view/withdrawCash/tixian-apply')
      // },
      {
        path: '/sales',
        name: 'sales',
        meta: {
          title: '我的结算',
          icon: '_dingdan',
          access: ['SXR003']
        },
        component: () => import('@/view/withdrawCash/sales')
      },
      {
        path: '/pos',
        name: 'pos',
        meta: {
          title: '交易记录',
          icon: '_dingdan'
        },
        component: () => import('@/view/tradingFlows/pos')
      }

    ]
  }
]
