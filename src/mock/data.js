import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return {
    status: '1001',
    data: tableData,
    tips: ''
  }
}
