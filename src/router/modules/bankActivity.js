import Main from '@/view/main'
/**
 * 银行卡活动
 */
export default [
  {
    path: '/marketing-platform',
    name: 'marketing-platform',
    meta: { title: '银行卡活动', icon: '_dingdan', access: ['SXR004'] },
    component: Main,
    children: [
      {
        path: 'activity-list',
        name: 'activity-list',
        meta: {
          title: '活动列表',
          icon: 'svg_qq'
        },
        component: () => import('@/view/marketingPlatform/activityList.vue')
      },
      {
        path: 'transaction-list',
        name: 'transaction-list',
        meta: {
          title: '交易列表',
          icon: 'svg_qq'
        },
        component: () => import('@/view/marketingPlatform/transactionList.vue')
      },
      {
        path: 'account-statement',
        name: 'account-statement',
        meta: {
          title: '对账单',
          icon: 'svg_qq'
        },
        component: () => import('@/view/marketingPlatform/accountStatement.vue')
      }
    ]
  }
]
