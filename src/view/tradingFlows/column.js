let column = [
  { title: '序号', type: 'index', width: 60, align: 'center' },
  { title: 'CSN号', key: 'pos_csn' },
  { title: 'pos流水号', key: 'batch_number' },
  // { title: '合伙人名称', key: 'userName' },
  // { title: '合伙人类型', key: 'chstatus' },
  { title: '商户名称', key: 'merchantName' },
  { title: '门店名称', key: 'storeName' },
  { title: '操作员', key: 'operator' },
  { title: '会员手机号', key: 'mobile' },
  // { title: '终端编码', key: 'terminal_number' },
  // { title: '机具状态', key: 'shstatus' },
  // { title: '支付类型', key: 'scan_tickets_name' },
  {
    title: '支付类型',
    key: 'pay_channel',
    render: (h, params) => {
      let pay = params.row.pay_channel
      let type = params.row.bank_card_type
      return h(
        'span',
        null,
        pay === '1' ? '支付宝' : pay === '2' ? '微信' : (pay === '[]' && type === '1') ? '借记卡' : '贷记卡'
      )
    }
  },
  // { title: '刷卡金额', key: 'deal_price' },
  // { title: '结算金额', key: 'real_price' },
  { title: '应收', key: 'deal_price' },
  // { title: '卡活动', key: 'deal_price' },
  { title: '实收', key: 'real_price' },
  // { title: '费率利润比', key: 'profit_rate' },
  // { title: '利润', key: 'profit_money' },
  { title: '补贴', key: 'subsidies_price' },
  { title: '交易时间',
    key: '',
    render: (h, params) => {
      return h(
        'span',
        params.row.trading_time.substring(0, 19)
      )
    }
  }
]

const blackListMap = {
  'SXR001': ['subsidies_price', 'operator'], // 城市合伙人  渠道合伙人  业务员  没有补贴
  'SXR002': ['subsidies_price', 'operator'],
  'SXR003': ['profit_rate', 'profit_money', 'operator'],
  'SXR004': ['profit_rate', 'profit_money', 'merchantName', 'mobile'] // 商户没有 利润,利润比  有门店无商户   有操作员  没有会员手机号
}

export default function (role) {
  let list = blackListMap[role]
  if (list) {
    return column.filter(item => {
      return item.key === undefined || list.indexOf(item.key) < 0
    })
  }
  return column
}
