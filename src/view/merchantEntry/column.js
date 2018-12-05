import { formatDate } from '@/libs/util'
const blackListMap = {
  'SXR004': ['merchantsName', 'action'], // 商户  没商户
  'SXR003': ['action'],
  'SXR002': ['action']
}

export default function (role) {
  let column = [
    { title: '序号', type: 'index' },
    { title: 'CSN号', key: 'posCsn' },
    { title: 'POS终端号', key: 'terminalNumber' },
    {
      title: '品牌',
      key: 'brandId',
      render: (h, params) => {
        return h('div', [
          h('span', params.row.brandId === 1 ? '新大陆' : (params.row.brandId === 2 ? '嘉联' : ''))
        ])
      }
    },
    { title: '激活码', key: 'activeCode' },
    { title: '业务员', key: 'salesmanName' },
    { title: '所在商户', key: 'merchantsName' },
    { title: '门店名称', key: 'merchantsStoresName' },
    {
      title: '购买政策',
      key: 'posShareProfit',
      render: (h, params) => {
        return h('div', [
          h('span', params.row.posShareProfit === 1 ? '双免' : (params.row.posShareProfit === 2 ? '分期' : (params.row.posShareProfit === 3 ? '买断' : '')))
        ])
      }
    },
    {
      title: '是否达标',
      key: 'isStandard',
      render: (h, params) => {
        return h('div', [
          h('span',
            {
              style: {
                color: '#2b85e4',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  if (params.row.isStandard !== 0) {
                    this.isShow = true
                    this.data.csn = params.row.posCsn
                    this.data.store = params.row.merchantsName
                    this.data.shop = params.row.posShareProfit === 1 ? '双免' : (params.row.posShareProfit === 2 ? '分期' : (params.row.posShareProfit === 3 ? '买断' : ''))
                    this.data.isStandard = params.row.isStandard === 0 ? '已达标' : (params.row.isStandard === 1 ? '考察期内超过3个月月流水额不足5万' : (params.row.isStandard === 2 ? 'POS机激活后前10天流水未达3万' : (params.row.isStandard === 3 ? '考察期内超过3个月月流水额不足40万' : (params.row.isStandard === -1 ? '未达标' : ''))))
                  }
                }
              }
            }, params.row.isStandard === 0 ? '是' : '否')
        ])
      }
    },
    {
      title: '是否转正',
      key: 'isRegular',
      render: (h, params) => {
        return h('div', [
          h('span', params.row.isRegular === 0 ? '否' : '是')
        ])
      }
    },
    { title: '进件人',
      key: 'createUserName',
      render: (h, params) => {
        return h('div', [
          h('span', params.row.createAdminName === null ? params.row.createUserName : (params.row.createUserName === null ? params.row.createAdminName : ''))
        ])
      }
    },
    {
      title: '最后一次刷卡',
      key: 'posPayLastTime',
      render: (h, params) => {
        return h('div', [
          h('span', formatDate(params.row.createTime, 'yyyy-MM-dd hh:mm:ss'))
        ])
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      render: (h, params) => {
        return h('div', [
          h('span', formatDate(params.row.createTime, 'yyyy-MM-dd hh:mm:ss'))
        ])
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 130,
      render: (h, params) => {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.isShowActive = true
                  this.ycsn = params.row.posCsn
                  this.posId = params.row.id
                  this.title = '解绑操作'
                }
              }
            },
            '解绑'
          ),
          h(
            'Button',
            {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.show = true
                  this.ycsn = params.row.posCsn
                  this.posId = params.row.id
                  this.title = '换绑操作'
                }
              }
            },
            '换绑'
          )
        ])
      }
    }
  ]
  let list = blackListMap[role]
  if (list) {
    return column.filter(item => {
      return item.key === undefined || list.indexOf(item.key) < 0
    })
  }
  return column
}
