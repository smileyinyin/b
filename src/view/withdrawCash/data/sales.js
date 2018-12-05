import { formatDate } from '@/libs/util'
export default function () {
  let columns = [
    { title: '序号', type: 'index' },
    { title: '结算单号', key: 'billUuid' },
    { title: '年月',
      key: 'billStartDate',
      render: (h, params) => {
        return h(
          'span',
          null,
          formatDate(
            new Date(params.row.billStartDate),
            'yyyy-MM'
          )
        )
      }
    },
    { title: '审核状态', key: 'ttstatus' },
    { title: '打款状态', key: 'ddstatus' },
    { title: '结算状态', key: 'jjstatus' },
    { title: '结算单生成时间',
      key: 'createTime',
      render: (h, params) => {
        return h(
          'span',
          null,
          formatDate(
            new Date(params.row.createTime),
            'yyyy-MM-dd hh:mm:ss'
          )
        )
      }
    }
  ]
  return columns
}
