import { formatDate } from '@/libs/util'
import { getMerchantsActive } from '@/api/merchant'

// 操作集合
const operationMap = {
  // 停业
  'offline': function() {
    return (h, params) => h('Poptip', {
      props: { confirm: true, title: '确定要停业吗？' },
      on: { 'on-ok': () => getMerchantsActive({ shopId: params.row.id, shopStatus: 5 }).then(res => this.getMerchantList()) }
    }, [
      h('Button', {
        props: { type: 'error', size: 'small' },
        style: { marginRight: '5px' }
      }, '停业')
    ])
  },

  // 查看审核结果
  'checkInfo': function() {
    return (h, params) => h('Button', {
      props: { type: 'primary', size: 'small' },
      style: { marginRight: '5px' },
      on: {
        click: () => {
          this.setMerchant(params.row)
          this.$router.push({ name: 'checkInfo' })
        }
      }
    }, '查看')
  },

  // 恢复
  'active': function() {
    return (h, params) => h('Poptip', {
      props: { confirm: true, title: '确定要恢复吗？' },
      on: { 'on-ok': () => getMerchantsActive({ shopId: params.row.id, shopStatus: 3 }).then(res => this.getMerchantList()) }
    }, [
      h('Button', {
        props: { type: 'success', size: 'small' },
        style: { marginRight: '5px' }
      }, '恢复')
    ])
  },

  // 修改
  'edit': function() {
    return (h, params) => h('Button', {
      props: { size: 'small', type: 'ghost' },
      directives: [ // 只有城市合伙人 拥有 编辑操作
        { name: 'permission', value: ['SXR001'] }
      ],
      on: {
        click: () => {
          this.setMerchant(params.row)
          this.$router.push({ name: 'merchantAdd', params: params.row })
        }
      }
    }, '修改')
  }
}

// 状态对应中文
const status2Name = {
  1: '草稿',
  2: '待审核',
  3: '正常',
  4: '审核失败',
  5: '停业'
}

// status2operation
const status2operation = {
  1: ['checkInfo'],
  2: ['checkInfo'],
  3: ['checkInfo', 'edit'],
  4: ['checkInfo'],
  5: ['checkInfo', 'active']
}

// 自定义渲染
const renderMap = {
  // 商户名称
  'name': function() {
    return (h, params) => {
      return h('Tooltip', {
        props: { placement: 'top' }
      }, [
        params.row.name,
        h('span', { slot: 'content', style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.name)
      ])
    }
  },
  // 绑定信息
  'accountStatus': function() {
    return (h, params) => {
      let canAdd = params.row.status === 3
      return h(
        'span',
        canAdd ? {
          class: 'link',
          on: {
            click: () => this.goAccountInfo(params.row)
          }
        } : { style: { 'padding': '5px' } },
        params.row.accountStatus === 1 ? '已绑定' : '未绑定'
      )
    }
  },
  // 门店数
  'storesNumber': function () {
    return (h, params) => {
      let canNotAdd = params.row.mold === 1 && params.row.accountStatus !== 1
      return h(
        'span',
        !canNotAdd ? {
          class: 'link',
          on: {
            click: () => this.goStoreList(params.row)
          }
        } : { style: { 'padding': '5px' } },
        params.row.storesNumber || 0
      )
    }
  }
}

export default function makeColumn() {
  let columns = [
    { title: 'ID', key: 'id', minWidth: 10 },
    { title: '商户名称', key: 'name', ellipsis: true, minWidth: 65, renderFn: 'name' },
    { title: '法人名称', key: 'legalName', minWidth: 20 },
    { title: '经营类型', key: 'categoryName', minWidth: 20 },
    { title: '绑定信息', key: 'accountStatus', minWidth: 30, renderFn: 'accountStatus' },
    { title: '门店数', key: 'storesNumber', minWidth: 5, renderFn: 'storesNumber' },
    { title: '会员数', key: 'memberNumber', minWidth: 5 },
    {
      title: '创建时间',
      key: 'createTime',
      minWidth: 70,
      render: (h, params) => h('span', formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm'))
    },
    {
      title: '更新时间',
      key: 'modifyTime',
      minWidth: 70,
      render: (h, params) => h('span', formatDate(new Date(params.row.modifyTime), 'yyyy-MM-dd hh:mm'))
    },
    {
      title: '状态',
      key: 'status',
      minWidth: 5,
      render: (h, params) => h('span', null, status2Name[params.row.status])
    },
    {
      title: '操作',
      key: 'action',
      minWidth: 65,
      render: (h, params) => {
        let { status = 1 } = params.row
        let operationArr = []

        operationArr = status2operation[status]
          .map(oper => operationMap[oper].call(this)(h, params))
        return h('div', operationArr)
      }
    }
  ]

  columns.map(column => {
    if (column.renderFn) {
      column.render = renderMap[column.renderFn].call(this)
    }
  })

  return columns
}
