import Main from '@/view/main'

import help from './modules/help'
import personalCenter from './modules/personalCenter'
import pos from './modules/pos'
import bankActivity from './modules/bankActivity'
import financial from './modules/financial'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *        若使用 svg icon 需要在 icon 名前加 'svg_' 前缀
 *  hide: 设为 true 则不会在 面包屑导航中 出现路径
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'homehome',
    redirect: '/home',
    component: Main,
    meta: {
      hide: true,
      hideInMenu: false, // TODO 打开则暂时屏蔽首页
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hide: true,
          title: '首页',
          icon: '_weibiaoti1',
          notCache: true
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/goods-list',
    name: 'goods-list',
    meta: {title:'商户管理',icon:'_liebiao1', access: ['SXR001','SXR002', 'SXR003','SXR004'] },
    component: Main,
    children: [
      {
        path: '/merchantList',
        name: 'merchantList',
        meta: {
          title: '商户管理',
          icon: '_gongwenbao',
          access: ['SXR001','SXR002', 'SXR003']
        },
        component: () => import('@/view/merchant/index')
      },
      {
        path: '/merchantAdd',
        name: 'merchantAdd',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchant/merchantAdd')
      },
      // {
      //   path: '/legalInfo',
      //   name: 'legalInfo',
      //   meta: {
      //     hideInMenu: true
      //   },
      //   component: () => import('@/view/merchant/legalInfo')
      // },
      {
        path: '/accountInfo',
        name: 'accountInfo',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchant/accountInfo')
      },
      {
        path: '/storeList',
        name: 'storeList',
        meta: {
          title: '门店管理',
          icon: '_gongwenbao',
          access: ['SXR004']
        },
        component: () => import('@/view/merchant/storeList')
      },
      {
        path: '/storeAdd',
        name: 'storeAdd',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchant/storeAdd')
      },
      {
        path: '/checkInfo',
        name: 'checkInfo',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchant/components/checkInfo')
      },
      // {
      //   path: '/store-goods',
      //   name: 'store-goods',
      //   meta: {
      //     access: ['SXR001','SXR002'],
      //     title: '商户商品列表',
      //     icon: '_liebiao1'
      //   },
      //   component: () => import('@/view/goods-list/store-goods')
      // },
      // {
      //   path: '/store-order',
      //   name: 'store-order',
      //   meta: {
      //     title: '商户订单列表',
      //     icon: '_liebiao2'
      //   },
      //   component: () => import('@/view/goods-list/store-order')
      // },
    ]
  },
  // 2018.11.02 屏蔽会员管理
  {
    path: '/userManagement',
    name: 'userManagement',
    meta: { access: ['SXR004'] },
    component: Main,
    children: [
      {
        path: '/userManger',
        name: 'userManger',
        meta: { title: '会员管理', icon: '_user1' },
        component: () => import('@/view/single-page/userManger')
      },
      // {
      //   path: '/integralDetail',
      //   name: 'integralDetail',
      //   meta: {
      //     hideInMenu: true
      //   },
      //   component: () => import('@/view/single-page/userManger/integralDetail') // 积分明细
      // },

      // {
      //   path: '/userDetail',
      //   name: 'userDetail',
      //   meta: {
      //     hideInMenu: true
      //   },
      //   component: () => import('@/view/single-page/userManger/userDetail') // 用户详情
      // },
    ]
  },
  // {
  //   path: '/merchantManagement',
  //   name: 'merchantManagement',
  //   meta: { access: ['SXR001', 'SXR002', 'SXR003'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/merchantList',
  //       name: 'merchantList',
  //       meta: {
  //         title: '商户管理',
  //         icon: '_gongwenbao'
  //       },
  //       component: () => import('@/view/merchant/index')
  //     },
  //     {
  //       path: '/merchantAdd',
  //       name: 'merchantAdd',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/merchant/merchantAdd')
  //     },
  //     {
  //       path: '/legalInfo',
  //       name: 'legalInfo',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/merchant/legalInfo')
  //     },
  //     {
  //       path: '/accountInfo',
  //       name: 'accountInfo',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/merchant/accountInfo')
  //     },
  //     {
  //       path: '/storeList',
  //       name: 'storeList',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/merchant/storeList')
  //     },
  //     {
  //       path: '/storeAdd',
  //       name: 'storeAdd',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/merchant/storeAdd')
  //     },
  //     {
  //       path: '/checkInfo',
  //       name: 'checkInfo',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/merchant/components/checkInfo')
  //     },
  //   ]
  // },
  // {
  //   path: '/merchantEntryManagement',
  //   name: 'merchantEntryManagement',
  //   meta: { access: ['SXR001', 'SXR002', 'SXR003'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/merchantEntry',
  //       name: 'merchantEntry',
  //       meta: {
  //         title: '商户进件',
  //         icon: '_jinhuo'
  //       },
  //       component: () => import('@/view/merchantEntry/index')
  //     },
  //     {
  //       path: '/entryDetails',
  //       name: 'entryDetails',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/merchantEntry/entryDetails')
  //     },
  //     {
  //       path: '/entryEditor',
  //       name: 'entryEditor',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/merchantEntry/entryEditor')
  //     },
  //     {
  //       path: '/addEntry',
  //       name: 'addEntry',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/merchantEntry/addEntry')
  //     },
  //     {
  //       path: '/addEntryT',
  //       name: 'addEntryT',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/merchantEntry/addEntryT')
  //     }
  //   ]
  // },
  // {
  //   path:'/tradingFlow',
  //   name:'tradingFlow',
  //   meta: { title: '交易流水', icon: '_bokuanmingxi' },
  //   component:Main,
  //   children:[
  //     {
  //       path: '/online-shop',
  //       name: 'online-shop',
  //       meta: {
  //         title: '线上流水',
  //         icon: '_bokuanmingxi'
  //       },
  //       component: () => import('@/view/tradingFlows/online-shop')
  //     },
  //     {
  //       path: '/online-gy',
  //       name: 'online-gy',
  //       meta: {
  //         title: '线上供应链流水',
  //         access: ['SXR001', 'SXR002', 'SXR003'],
  //         icon: '_bokuanmingxi'
  //       },
  //       component: () => import('@/view/tradingFlows/online-gy')
  //     },
  //     {
  //       path: '/pos',
  //       name: 'pos',
  //       meta: {
  //         title: 'pos机交易统计',
  //         icon: '_bokuanmingxi'
  //       },
  //       component: () => import('@/view/tradingFlows/pos')
  //     },
  //   ]
  // },
  // {
  //   path: '/withdrawCashMenu',
  //   name: 'withdrawCashMenu',
  //   meta: { access: ['SXR001', 'SXR002', 'SXR003'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/withdrawCash',
  //       name: 'withdrawCash',
  //       meta: {
  //         title:'pos机账单管理',
  //         icon: '_dingdan'
  //       },
  //       component: () => import('@/view/withdrawCash/index')
  //     },
  //     {
  //       path: '/tixian-apply',
  //       name: 'tixian-apply',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/withdrawCash/tixian-apply')
  //     },
  //     {
  //       path: '/tixian-record',
  //       name: 'tixian-record',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/withdrawCash/tixian-record')
  //     }
  //   ]
  // },
  // {
  //   path: '/shareMoney',
  //   name: '/shareMoney',
  //   meta: {title: '分润管理',icon: '_chakanmingxi', access: ['SXR001', 'SXR002', 'SXR003'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/store-share',
  //       name: 'store-share',
  //       meta: {
  //         title: '商家线上订单分润',
  //         icon: '_mingxi'
  //       },
  //       component: () => import('@/view/shares/store-share')
  //     },
  //     {
  //       path: '/pos-share',
  //       name: 'pos-share',
  //       meta: {
  //         title: 'pos机费率分润',
  //         icon: '_mingxi'
  //       },
  //       component: () => import('@/view/shares/pos-share')
  //     },
  //     {
  //       path: '/gy-share',
  //       name: 'gy-share',
  //       meta: {
  //         title: '供应链分润',
  //         icon: '_mingxi'
  //       },
  //       component: () => import('@/view/shares/gy-share')
  //     },
  //   ]
  // },
  {
    path: '/qd-channel',
    name: 'qd-channel',
    meta: {title: '用户管理',icon: '_channel',access: ['SXR001']},
    component: Main,
    children: [
      // {
      //   path: '/channelParList',
      //   name: 'channelParList',
      //   meta: { title: '渠道合伙人列表', icon: '_channel',access: ['SXR001']},
      //   component: () => import('@/view/channelPartner/channelParList')
      // },
      {
        path: '/salesManList',
        name: 'salesManList',
        meta: { title: '业务员列表', icon: '_user-tie',access: ['SXR001']},
        component: () => import('@/view/salesMan/salesManList')
      },
      {
        path: '/salesManAdd',
        name: 'salesManAdd',
        meta: { hideInMenu: true },
        component: () => import('@/view/salesMan/salesManAdd')
      },
      {
        path: '/salesManCheck',
        name: 'salesManCheck',
        meta: { hideInMenu: true },
        component: () => import('@/view/salesMan/salesManCheck')
      },
      // {
      //   path: '/channelParAdd',
      //   name: 'channelParAdd',
      //   meta: { hideInMenu: true },
      //   component: () => import('@/view/channelPartner/channelParAdd')
      // },
      // {
      //   path: '/channelParCheck',
      //   name: 'channelParCheck',
      //   meta: { hideInMenu: true },
      //   component: () => import('@/view/channelPartner/channelParCheck')
      // },
      // {
      //   path: '/store-online-share',
      //   name: 'store-online-share',
      //   meta: {
      //     title: '商家线上订单分润',
      //     icon: 'connection-bars'
      //   },
      //   component: () => import('@/view/channelPartner/store-online-share')
      // },
      // {
      //   path: '/pos-fl-share',
      //   name: 'pos-fl-share',
      //   meta: {
      //     title: 'pos机费率分润',
      //     icon: 'connection-bars'
      //   },
      //   component: () => import('@/view/channelPartner/pos-fl-share')
      // },
      // {
      //   path: '/qd-gy-share',
      //   name: 'qd-gy-share',
      //   meta: {
      //     title: '供应链分润',
      //     icon: 'connection-bars'
      //   },
      //   component: () => import('@/view/channelPartner/qd-gy-share')
      // },
      // {
      //   path: '/add-qd-user',
      //   name: 'add-qd-user',
      //   meta: {
      //     title: '渠道合伙人添加',
      //     icon: 'ios-box'
      //   },
      //   component: () => import('@/view/channelPartner/add-qd-user')
      // },
      // {
      //   path: '/edit-qd-user',
      //   name: 'edit-qd-user',
      //   meta: {
      //     title: '渠道合伙人修改',
      //     icon: 'ios-box'
      //   },
      //   component: () => import('@/view/channelPartner/edit-qd-user')
      // }
    ]
  },

  // {
  //   path: '/salesMan',
  //   name: 'salesMan',
  //   meta: {title: '业务员管理',icon: '_user-tie', access: ['SXR001', 'SXR002'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/salesManAdd',
  //       name: 'salesManAdd',
  //       meta: { hideInMenu: true },
  //       component: () => import('@/view/salesMan/salesManAdd')
  //     },
      
  //     // {
  //     //   path: '/salesMan-online',
  //     //   name: 'salesMan-online',
  //     //   meta: {title: '业务员商家线上订单分润',icon: '_mingxi'},
  //     //   component: () => import('@/view/salesMan/salesMan-online')
  //     // },
  //     // {
  //     //   path: '/salesMan-pos-online',
  //     //   name: 'salesMan-pos-online',
  //     //   meta: {title: 'pos机费率分润',icon: '_mingxi'},
  //     //   component: () => import('@/view/salesMan/salesMan-pos-online')
  //     // },
  //   ]
  // },
  // {
  //   path: '/see-gy-order-list',
  //   name: 'see-gy-order-list',
  //   meta: { access: ['SXR001','SXR002'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/see-gy-orderList',
  //       name: 'see-gy-orderList',
  //       meta: {
  //         title: '供应链订单列表',
  //         icon: '_dingdanjilu'
  //       },
  //       component: () => import('@/view/see-gy-orderList/index')
  //     }
  //   ]
  // },
  //商品 (城市合伙人渠道合伙人)
  // {
  //   path: '/gy-goods-list',
  //   name: 'gy-goods-list',
  //   meta: { access: ['SXR001','SXR002'] },
  //   component: Main,
  //   children: [

  //   ]
  // },
  // {
  //   path: '/machineManagement',
  //   name: 'machineManagement',
  //   meta: { title: '机具管理', icon: 'settings' },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/machineList',
  //       name: 'machineList',
  //       meta: {
  //         title: '机具列表',
  //         icon: 'settings'
  //       },
  //       component: () => import('@/view/machine/list')
  //     },
  //     {
  //       path: '/machineEntry',
  //       name: 'machineEntry',
  //       meta: {
  //         title: '机具入库',
  //         icon: 'wrench'
  //       },
  //       component: () => import('@/view/machine/entry')
  //     },
  //     {
  //       path: '/channelPartnerStock',
  //       name: 'channelPartnerStock',
  //       meta: {
  //         title: '渠道合伙人库存',
  //         icon: 'wrench'
  //       },
  //       component: () => import('@/view/machine/channelPartnerStock')
  //     },
  //     {
  //       path: '/machineAllocate',
  //       name: 'machineAllocate',
  //       meta: {
  //         title: '机具下拨',
  //         icon: 'wrench'
  //       },
  //       component: () => import('@/view/machine/machineAllocate')
  //     },
  //     {
  //       path: '/allocateRecord',
  //       name: 'allocateRecord',
  //       meta: {
  //         title: '下拨记录',
  //         icon: 'wrench'
  //       },
  //       component: () => import('@/view/machine/allocateRecord')
  //     },
  //     {
  //       path: '/reallocateRecord',
  //       name: 'reallocateRecord',
  //       meta: {
  //         title: '回拨记录',
  //         icon: 'wrench'
  //       },
  //       component: () => import('@/view/machine/reallocateRecord')
  //     }
  //   ]
  // },
  // 供应商管理 后端接口还没做。。。
  // {
  //   path: '/supplyChainManagement',
  //   name: 'supplyChainManagement',
  //   meta: { access: ['SXR001', 'SXR002'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/supplyList',
  //       name: 'supplyList',
  //       meta: {
  //         title: '供应商管理',
  //         icon: 'ios-box'
  //       },
  //       component: () => import('@/view/supplyChain/index')
  //     },
  //     {
  //       path: '/supplyAdd',
  //       name: 'supplyAdd',
  //       meta: { hideInMenu: true },
  //       component: () => import('@/view/supplyChain/supplyAdd')
  //     },
  //     {
  //       path: '/supplyCheck',
  //       name: 'supplyCheck',
  //       meta: { hideInMenu: true },
  //       component: () => import('@/view/supplyChain/supplyCheck')
  //     }
  //   ]
  // },
  // {
  //   path: '/orderManagement',
  //   name: 'orderManagement',
  //   meta: { access: ['SXR004','SXR006'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/order',
  //       name: 'order',
  //       meta: {
  //         title: '订单管理',
  //         icon: '_dingdan'
  //       },
  //       component: () => import('@/view/order/index.vue')
  //     },
  //     {
  //       path: '/see-order',
  //       name: 'see-order',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/order/see-order.vue')
  //     },
  //   ]
  // },
  // 供应链(城市合伙人渠道合伙人)
  // {
  //   path: '/order-list',
  //   name: 'order-list',
  //   meta: {title:'供应链管理',icon:'_dingdan', access: ['SXR001','SXR002'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/gy-goods',
  //       name: 'gy-goods',
  //       meta: {
  //         title: '供应链商品列表',
  //         icon: '_liebiao2'
  //       },
  //       component: () => import('@/view/order-list/gy-goods')
  //     },
  //     {
  //       path: '/see-gy-orderList',
  //       name: 'see-gy-orderList',
  //       meta: {
  //         title: '供应链订单列表',
  //         icon: '_dingdanjilu'
  //       },
  //       component: () => import('@/view/order-list/see-gy-orderList')
  //     }
  //   ]
  // },
  // 体验店自提订单
  // {
  //   path: '/tiyan-orders',
  //   name: 'tiyan-orders',
  //   meta: { access: ['SXR007'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/tiyan-order',
  //       name: 'tiyan-order',
  //       meta: {
  //         title: '订单管理(体验店)',
  //         icon: 'ios-box'
  //       },
  //       component: () => import('@/view/tiyan-order/index.vue')
  //     },
  //     {
  //       path: '/see-tiyan-order',
  //       name: 'see-tiyan-order',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/tiyan-order/see-tiyan-order.vue')
  //     },
  //   ]
  // },
  // 体验店线上订单
  // {
  //   path: '/ty-online-orders',
  //   name: 'ty-online-orders',
  //   meta: { access: ['SXR007'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/ty-online-order',
  //       name: 'ty-online-order',
  //       meta: {
  //         title: '订单管理(体验店线上)',
  //         icon: 'ios-box'
  //       },
  //       component: () => import('@/view/ty-online-order/index.vue')
  //     },
  //     {
  //       path: '/see-online-order',
  //       name: 'see-online-order',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/ty-online-order/see-online-order.vue')
  //     },
  //   ]
  // },
  // {
  //   path: '/goodsManagement',
  //   name: 'goodsManagement',
  //   meta: { access: ['SXR004','SXR006','SXR007'] },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/goods',
  //       name: 'goods',
  //       meta: {
  //         title: '商品管理',
  //         icon: '_shangpinkucun'
  //       },
  //       component: () => import('@/view/goods/goods.vue')
  //     },
  //     {
  //       path: '/add-goods',
  //       name: 'add-goods',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/goods/add-goods.vue')
  //     },
  //     {
  //       path: '/no-edit-goods',
  //       name: 'no-edit-goods',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/goods/no-edit-goods.vue')
  //     },
  //     {
  //       path: '/edit-goods',
  //       name: 'edit-goods',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/goods/edit-goods.vue')
  //     },
  //     {
  //       path: '/see-goods',
  //       name: 'see-goods',
  //       meta: {
  //         hideInMenu: true
  //       },
  //       component: () => import('@/view/goods/see-goods.vue')
  //     },
  //   ]
  // },
  ...pos,
  ...bankActivity,
  ...financial,
  ...personalCenter,
  ...help,
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }


]
