import { formatDate } from '@/libs/util'
export default function () {
  let columns = [
    { title: '序号', type: 'index' },
    { title: '账单号', key: 'bill_uuid' },
    { title: '年月',
      key: 'create_time',
      render: (h, params) => {
        return h(
          'span',
          null,
          formatDate(
            new Date(params.row.create_time),
            'yyyy-MM'
          )
        )
      }
    },
    { title: '可结算金额', key: 'bii_m_sum_money' },
    { title: '手续费', key: 'service_charge' },
    { title: '到账金额',
      key: '',
      render: (h, params) => {
        return h(
          'span',
          (params.row.bii_m_sum_money * 100 -
            params.row.service_charge * 100) /
            100
        )
      }
    },
    { title: '提现状态', key: 'ttstatus' },
    { title: '生成时间',
      key: 'create_time',
      render: (h, params) => {
        return h(
          'span',
          null,
          formatDate(
            new Date(params.row.create_time),
            'yyyy-MM-dd hh:mm:ss'
          )
        )
      }
    },
    { title: '操作',
      width: 200,
      key: 'control',
      render: (h, params) => {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {
                marginRight: '5px',
                display: params.row.bill_no === -1 ? '' : 'none'
              },
              on: {
                click: () => {
                  this.addfp(params.row)
                }
              }
            },
            '上传发票'
          ),
          h(
            'Button',
            {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {
                marginRight: '5px',
                display: params.row.bill_no === 2 ? '' : 'none'
              },
              on: {
                click: () => {
                  this.edit(params.row)
                }
              }
            },
            '修改发票'
          ),
          h(
            'Button',
            {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {
                marginRight: '5px',
                display: params.row.bill_no === 1 ? '' : 'none'
              },
              on: {
                click: () => {
                  this.seeMessage(params.row)
                }
              }
            },
            '打款信息'
          )
        ])
      }
    }
  ]
  return columns
}
