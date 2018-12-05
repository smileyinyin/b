import Main from '@/view/main'
/**
 * 机具管理
 */
export default [
  {
    path: '/merchantEntry',
    name: 'merchantEntry',
    meta: { title: '机具管理', icon: '_jinhuo', access: ['SXR001', 'SXR002', 'SXR003', 'SXR004'] },
    component: Main,
    children: [
      {
        path: '/posList',
        name: 'posList',
        meta: {
          title: '商户进件',
          icon: '_jinhuo',
          access: ['SXR001']
        },
        component: () => import('@/view/merchantEntry/index')
      },
      // {
      //   path: '/posWarehousing',
      //   name: 'posWarehousing',
      //   meta: {
      //     title: '机具库存',
      //     icon: '_jinhuo'
      //   },
      //   component: () => import('@/view/merchantEntry/posWarehousing')
      // },
      // {
      //   path: '/posBackRecord',
      //   name: 'posBackRecord',
      //   meta: {
      //     title: '回拨记录',
      //     icon: '_jinhuo'
      //   },
      //   component: () => import('@/view/merchantEntry/posBackRecord')
      // },
      // {
      //   path: '/entryRecord',
      //   name: 'entryRecord',
      //   meta: {
      //     title: '进件记录',
      //     icon: '_jinhuo'
      //   },
      //   component: () => import('@/view/merchantEntry/entryRecord')
      // },
      {
        path: '/posTerminalList',
        name: 'posTerminalList',
        meta: {
          title: '终端列表',
          icon: '_jinhuo',
          access: ['SXR001', 'SXR002', 'SXR003', 'SXR004']
        },
        component: () => import('@/view/merchantEntry/posTerminalList')
      },
      {
        path: '/entryDetails',
        name: 'entryDetails',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchantEntry/entryDetails') // pos进件详情
      },
      {
        path: '/entryEditor',
        name: 'entryEditor',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchantEntry/entryEditor') // pos机进件编辑
      },
      {
        path: '/addEntry',
        name: 'addEntry',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchantEntry/addEntry') // 新增新大陆pos机进件
      },
      {
        path: '/addEntryT',
        name: 'addEntryT',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchantEntry/addEntryT') // 新增嘉联pos机进件
      }
    ]
  }
]
